// Generates one HTML entry per case study from src/data/content.js, so page
// titles and meta descriptions can never drift from the copy they describe.
// Runs automatically before `npm run dev` and `npm run build`.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { projects } from '../src/data/content.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const escape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const themeScript = `      (function () {
        try {
          var stored = localStorage.getItem('theme');
          if (stored === 'light' || stored === 'dark') {
            document.documentElement.dataset.theme = stored;
          } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.dataset.theme = 'dark';
          }
        } catch (e) {}
      })();`;

const page = (project) => {
  const title = `${project.name} — Case Study | Kimberly Lopez`;
  const description = project.oneLiner;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="#fbfaf7" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0e1013" media="(prefers-color-scheme: dark)" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <meta name="author" content="Kimberly Lopez" />
    <!-- TODO: add an absolute <link rel="canonical"> once the domain is known. -->
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Kimberly Lopez" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Kimberly Lopez — Software Developer" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="/og-image.png" />

    <script>
${themeScript}
    </script>
  </head>
  <body>
    <div id="root" data-project="${project.slug}"></div>
    <script type="module" src="/src/case-study.jsx"></script>
  </body>
</html>
`;
};

const dirFor = { 'pmai-warehouse': 'pmai-warehouse' };

for (const project of projects.filter((p) => p.caseStudy)) {
  const dir = resolve(root, 'work', dirFor[project.slug] ?? project.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'index.html'), page(project), 'utf8');
  console.log(`wrote work/${project.slug}/index.html`);
}
