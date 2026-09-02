// Accessibility pass: token contrast maths, real keyboard tabbing, focus
// rings, the mobile menu's open/Escape behaviour, and document landmarks.
// Run against `npm run preview`.
//
//   node scripts/a11y.mjs [baseUrl]

import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:4173';
const b = await chromium.launch({ channel: 'msedge' });
const problems = [];

// --- Contrast maths for every token pair the page actually uses -------------
const lum = (hex) => {
  const c = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255)
    .map(v => v <= 0.03928 ? v/12.92 : ((v+0.055)/1.055)**2.4);
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
};
const ratio = (a,bb) => { const [x,y]=[lum(a),lum(bb)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05); };
const pairs = [
  ['light body',        '#20241d','#f5f1e8', 4.5],
  ['light muted',       '#5f6258','#f5f1e8', 4.5],
  ['light faint',       '#656761','#f5f1e8', 4.5],
  ['light faint/sunken','#656761','#eee9dc', 4.5],
  ['light faint/sage',  '#656761','#e4e8da', 4.5],
  ['light muted/surface','#5f6258','#faf8f2', 4.5],
  ['light muted/card-glass','#5f6258','#f8f6ef', 4.5],
  ['light faint/card-glass','#656761','#f8f6ef', 4.5],
  ['light accent/card-glass','#566b47','#f8f6ef', 4.5],
  ['light accent',      '#566b47','#f5f1e8', 4.5],
  ['light accent/surface','#566b47','#faf8f2', 4.5],
  ['light accent/sage', '#566b47','#e4e8da', 4.5],
  ['light on-accent',   '#faf8f2','#566b47', 4.5],
  ['light on-hover',    '#faf8f2','#465b3b', 4.5],
  ['dark body',         '#ece9df','#111510', 4.5],
  ['dark muted',        '#b9bbaf','#111510', 4.5],
  ['dark faint',        '#94988b','#111510', 4.5],
  ['dark faint/sage',   '#94988b','#263124', 4.5],
  ['dark muted/surface','#b9bbaf','#171c16', 4.5],
  ['dark muted/card-glass','#b9bbaf','#151a14', 4.5],
  ['dark faint/card-glass','#94988b','#151a14', 4.5],
  ['dark accent/card-glass','#8ea47a','#151a14', 4.5],
  ['dark muted/raised', '#b9bbaf','#1c221b', 4.5],
  ['dark accent',       '#8ea47a','#111510', 4.5],
  ['dark accent/surface','#8ea47a','#171c16', 4.5],
  ['dark accent/sage',  '#8ea47a','#263124', 4.5],
  ['dark on-accent',    '#111510','#8ea47a', 4.5],
  ['dark on-hover',     '#111510','#a0b48d', 4.5],
];

console.log('=== CONTRAST ===');
for (const [name,fg,bg,min] of pairs) {
  const r = ratio(fg,bg);
  const ok = r >= min;
  console.log(`  ${ok?'PASS':'FAIL'}  ${r.toFixed(2)}:1  ${name}`);
  if (!ok) problems.push(`contrast ${name} ${r.toFixed(2)}:1`);
}

// --- Keyboard ---------------------------------------------------------------
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto(base + '/', {waitUntil:'networkidle'});

// First Tab must reach the skip link, and it must become visible.
await p.keyboard.press('Tab');
const skip = await p.evaluate(() => {
  const el = document.activeElement;
  const r = el.getBoundingClientRect();
  return { text: el.textContent.trim(), onscreen: r.top >= 0, outline: getComputedStyle(el).outlineWidth };
});
console.log('\n=== KEYBOARD ===');
console.log('  first tab ->', JSON.stringify(skip));
if (!/skip/i.test(skip.text)) problems.push('first Tab does not reach the skip link');
if (!skip.onscreen) problems.push('skip link stays off-screen when focused');

// Every focusable control must show a visible focus ring.
const noRing = [];
const seen = new Set();
for (let i = 0; i < 70; i++) {
  const info = await p.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    // A ring may legitimately be drawn on an ancestor — the project cards
    // stretch their title link over the whole card and ring the card itself.
    const hasRing = (n) => {
      const cs = getComputedStyle(n);
      return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
    };
    let node = el;
    let ring = false;
    for (let d = 0; node && d < 4; d++, node = node.parentElement) {
      if (hasRing(node)) { ring = true; break; }
    }
    return {
      name: (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 30),
      ring,
      tag: el.tagName,
    };
  });
  if (info && !seen.has(info.name)) {
    seen.add(info.name);
    if (!info.ring) noRing.push(`${info.tag} "${info.name}"`);
  }
  await p.keyboard.press('Tab');
}
console.log('  controls without a focus ring:', noRing.length ? noRing : 'none');
noRing.forEach(n => problems.push(`no focus ring: ${n}`));

// Mobile menu: opens, traps nothing, closes on Escape.
const m = await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await m.goto(base + '/', {waitUntil:'networkidle'});
await m.click('.nav-toggle');
const opened = await m.getAttribute('#mobile-nav','data-open');
await m.keyboard.press('Escape');
await m.waitForTimeout(150);
const closed = await m.getAttribute('#mobile-nav','data-open');
const expanded = await m.getAttribute('.nav-toggle','aria-expanded');
console.log(`  mobile menu: opened=${opened} escape-closed=${closed==='false'} aria-expanded=${expanded}`);
if (opened !== 'true') problems.push('mobile menu did not open');
if (closed !== 'false') problems.push('Escape did not close the mobile menu');

// Hidden-but-tabbable links are a classic mobile-menu bug.
const ghost = await p.evaluate(() =>
  [...document.querySelectorAll('#mobile-nav a')].filter(a => a.offsetParent !== null).length);
console.log('  desktop: tabbable links inside the hidden mobile menu:', ghost);
if (ghost) problems.push(`${ghost} tabbable links inside the hidden mobile menu`);

// --- Landmarks & language ---------------------------------------------------
const doc = await p.evaluate(() => ({
  lang: document.documentElement.lang,
  main: document.querySelectorAll('main').length,
  header: document.querySelectorAll('header.header').length,
  footer: document.querySelectorAll('footer').length,
  imgNoAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length,
  btnNoName: [...document.querySelectorAll('button')]
    .filter(x => !x.textContent.trim() && !x.getAttribute('aria-label')).length,
}));
console.log('\n=== STRUCTURE ===');
console.log(' ', JSON.stringify(doc));
if (doc.lang !== 'en') problems.push('missing lang');
if (doc.main !== 1) problems.push('expected exactly one <main>');
if (doc.imgNoAlt) problems.push('image without alt');
if (doc.btnNoName) problems.push('button without an accessible name');

await b.close();
console.log('\n=== PROBLEMS ===');
console.log(problems.length ? problems.map(x=>'  '+x).join('\n') : '  none');
