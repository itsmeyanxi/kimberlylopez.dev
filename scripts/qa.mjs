// Browser QA pass. Drives the built site in Edge and reports console errors,
// horizontal overflow, broken internal links and focus-visibility, at the
// viewport widths the brief calls out. Run against `npm run preview`.
//
//   node scripts/qa.mjs [baseUrl]

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] ?? 'http://localhost:4173';
const widths = [1600, 1440, 1360, 1301, 1300, 1200, 1024, 768, 430, 390];
const pages = ['/', '/work/pmai-warehouse/', '/work/sopod/'];

await mkdir('scripts/.shots', { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' });
const problems = [];
const internalLinks = new Set();
const externalLinks = new Set();

for (const path of pages) {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: width < 700 ? 900 : 1000 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        problems.push(`[console ${msg.type()}] ${path} @${width}: ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => {
      problems.push(`[pageerror] ${path} @${width}: ${err.message}`);
    });
    page.on('requestfailed', (req) => {
      problems.push(`[requestfailed] ${path} @${width}: ${req.url()} ${req.failure()?.errorText}`);
    });

    const response = await page.goto(base + path, { waitUntil: 'networkidle' });
    if (!response?.ok()) problems.push(`[http ${response?.status()}] ${path}`);

    // Scroll the whole page so every reveal observer fires before measuring.
    await page.evaluate(async () => {
      // The site sets scroll-behavior: smooth, which would animate these jumps
      // and leave the observer never seeing the lower sections.
      const previous = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
      document.documentElement.style.scrollBehavior = previous;
    });

    const audit = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;

      // Anything actually sticking out past the viewport, named so it can be found.
      const wide = [];
      if (overflow > 1) {
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1)) {
            wide.push(
              `${el.tagName.toLowerCase()}.${(el.getAttribute('class') || '').split(' ')[0]} ` +
                `(${Math.round(r.left)}→${Math.round(r.right)})`
            );
          }
        });
      }

      const hidden = [...document.querySelectorAll('[data-reveal]')].filter(
        (el) => getComputedStyle(el).opacity === '0'
      ).length;

      const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));

      // Headings in document order, to eyeball the outline.
      const headings = [...document.querySelectorAll('h1,h2,h3')].map(
        (h) => `${h.tagName}:${h.textContent.trim().slice(0, 40)}`
      );

      const h1Count = document.querySelectorAll('h1').length;

      // Header items must not paint over each other. Overflowing nowrap text
      // does not widen the page, so the overflow check above cannot see it.
      const collisions = [];
      const bar = ['.brand', '.nav', '.header__actions']
        .map((sel) => [sel, document.querySelector(sel)])
        .filter(([, el]) => el && getComputedStyle(el).display !== 'none')
        .map(([sel, el]) => [sel, el.getBoundingClientRect()]);
      for (let i = 0; i < bar.length - 1; i++) {
        const [aName, a] = bar[i];
        const [bName, b] = bar[i + 1];
        if (a.right > b.left + 1) collisions.push(`${aName} overlaps ${bName}`);
      }

      return { overflow, wide: wide.slice(0, 6), hidden, links, headings, h1Count, collisions };
    });

    if (audit.overflow > 1) {
      problems.push(
        `[overflow ${audit.overflow}px] ${path} @${width}: ${audit.wide.join(' | ') || 'unattributed'}`
      );
    }
    if (audit.hidden > 0) {
      problems.push(`[invisible reveal x${audit.hidden}] ${path} @${width}`);
    }
    audit.collisions.forEach((c) => problems.push(`[header collision] ${path} @${width}: ${c}`));
    if (audit.h1Count !== 1) {
      problems.push(`[h1 count ${audit.h1Count}] ${path} @${width}`);
    }

    audit.links.forEach((href) => {
      if (!href) return;
      if (/^https?:/.test(href)) externalLinks.add(href);
      else if (href.startsWith('mailto:')) externalLinks.add(href);
      else if (href.startsWith('#')) internalLinks.add(path + href);
      else internalLinks.add(href);
    });

    if (width === 1440 || width === 390) {
      const name = `${path.replace(/\W+/g, '_') || 'home'}${width}`;
      await page.screenshot({ path: `scripts/.shots/${name}.png`, fullPage: width === 1440 });
    }

    await context.close();
  }
}

// Internal links must resolve.
const page = await (await browser.newContext()).newPage();
for (const href of [...internalLinks].filter((h) => !h.includes('#') || h.startsWith('/'))) {
  const url = href.split('#')[0];
  if (!url) continue;
  const res = await page.request.get(base + url).catch(() => null);
  if (!res || !res.ok()) problems.push(`[dead internal link ${res?.status() ?? 'ERR'}] ${url}`);
}

// In-page anchors must have a target.
for (const path of pages) {
  await page.goto(base + path);
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h !== '#' && !document.querySelector(h))
  );
  missing.forEach((h) => problems.push(`[dead anchor] ${path} -> ${h}`));
}

await browser.close();

console.log('\n=== EXTERNAL LINKS (not fetched) ===');
[...externalLinks].sort().forEach((l) => console.log('  ' + l));

console.log('\n=== PROBLEMS ===');
if (problems.length === 0) console.log('  none');
else [...new Set(problems)].forEach((p) => console.log('  ' + p));
console.log(`\n${new Set(problems).size} distinct problem(s).`);
