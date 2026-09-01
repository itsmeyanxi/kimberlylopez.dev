// Renders public/og-image.png (1200x630) from an inline SVG, using the same
// typefaces the site ships so the social card matches the page. Run with
// `npm run og` after changing the wording.

import { Resvg } from '@resvg/resvg-js';
import { decompress } from 'wawoff2';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

// resvg reads ttf/otf, not woff2, so the shipped web fonts are decompressed
// into a scratch directory first. Same font data, different container.
const sources = {
  newsreader:
    'node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2',
  inter: 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  mono: 'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
};

const cache = resolve(here, '.fonts');
await mkdir(cache, { recursive: true });

const fonts = [];
for (const [name, file] of Object.entries(sources)) {
  const ttf = Buffer.from(await decompress(await readFile(resolve(root, file))));
  const out = resolve(cache, `${name}.ttf`);
  await writeFile(out, ttf);
  fonts.push(out);
}

// NOTE: these are the families as named inside the TTFs, which are not the
// CSS family names Fontsource exposes ("Inter Variable" etc.). Getting this
// wrong silently falls back to the first loaded font.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f1e8"/>
  <rect x="0" y="0" width="1200" height="6" fill="#566b47"/>

  <text x="96" y="150" font-family="JetBrains Mono" font-size="21"
        letter-spacing="4.2" fill="#656761">KIMBERLY LOPEZ</text>

  <text x="96" y="272" font-family="Newsreader 16pt 16pt" font-size="76"
        font-weight="450" fill="#20241d">Software Developer building</text>
  <text x="96" y="358" font-family="Newsreader 16pt 16pt" font-size="76"
        font-weight="450" fill="#20241d">systems that solve</text>
  <text x="96" y="444" font-family="Newsreader 16pt 16pt" font-size="76"
        font-weight="450" fill="#566b47">real business problems.</text>

  <line x1="96" y1="512" x2="1104" y2="512" stroke="#d8d2c3" stroke-width="1.5"/>

  <text x="96" y="558" font-family="Inter" font-size="24" fill="#5f6258">Web applications · Backend development · Custom business systems</text>
  <text x="96" y="596" font-family="JetBrains Mono" font-size="19"
        letter-spacing="1.4" fill="#656761">Philippines · Open to remote opportunities</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    fontFiles: fonts,
    loadSystemFonts: false,
    defaultFontFamily: 'Inter',
  },
});

const png = resvg.render().asPng();
await writeFile(resolve(root, 'public/og-image.png'), png);

// Sanity check: a card that failed to load its fonts renders as an almost
// empty rectangle, which is easy to ship without noticing.
const size = png.length;
console.log(`wrote public/og-image.png (${(size / 1024).toFixed(1)} kB)`);
if (size < 12_000) {
  console.warn('WARNING: the image looks too small — the text may not have rendered.');
  process.exitCode = 1;
}
