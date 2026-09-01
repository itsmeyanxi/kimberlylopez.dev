# Kimberly Lopez — personal portfolio

Personal developer portfolio with two audiences: recruiters hiring a software
developer, and businesses looking for someone to build or improve a system.
Distinct from the LokalGrp.dev team site.

React 19 + Vite 8, no CSS framework, no router.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview
```

## Where the content lives

**All copy is in [`src/data/content.js`](src/data/content.js).** Nothing else
needs editing to change wording, add a project, or fix a date.

That file has one rule: nothing in it is invented. Project scope and
contribution claims were read out of the repositories themselves — commit
history filtered to `itsmeyanxi@gmail.com`, controller and model listings,
README and SCHEMA files. Anything that could not be verified is written as a
string beginning with `TODO:` and renders on the page as a visible amber
placeholder chip, so an unverified claim cannot ship looking finished.

To resolve a placeholder, replace the `TODO: …` string with the real value.
To find them all:

```bash
grep -n "TODO:" src/data/content.js
```

## Résumé

There is no résumé PDF yet. Drop the file at
`public/Kimberly-Lopez-Resume.pdf` and set `profile.resumeReady = true` in
`content.js` — every résumé link on the site turns on at once. Until then they
render as placeholders rather than as downloads that 404.

## Pages

The landing page is `index.html`. Each case study is its own HTML entry under
`work/<slug>/`, generated from `content.js` so page titles and meta
descriptions can never drift from the copy they describe:

```bash
npm run pages      # regenerate work/*/index.html (also runs on dev and build)
```

Adding a project with `caseStudy: true` creates its page on the next run — but
add it to `build.rollupOptions.input` in `vite.config.js` too, or it will not
be built.

Real URLs, real per-page metadata, and no client-side router. Deploy `dist/`
to any static host.

## Social preview

`public/og-image.png` is generated from an inline SVG using the site's own
typefaces:

```bash
npm run og
```

## Checks

Both drive the built site in Edge via Playwright. Start `npm run preview`
first, then:

```bash
npm run qa      -- http://localhost:4173   # 5 pages x 9 widths
npm run a11y    -- http://localhost:4173
```

`qa` reports console errors, page errors, failed requests, horizontal
overflow (naming the offending elements), header collisions, elements left
invisible by the reveal animation, `<h1>` count, dead internal links and dead
in-page anchors. It also prints every external link for manual checking.

`a11y` computes WCAG contrast for each token pair the design actually uses,
tabs through the page with real key presses to confirm every control has a
visible focus ring, checks the skip link, and exercises the mobile menu's
open/Escape behaviour.

## Deploying

Cloudflare Pages, from the built output:

```bash
npm run build
npx wrangler pages deploy dist --project-name kimberlylopez-dev --branch main
```

`public/_headers` sets the cache policy, and `public/404.html` is served for
unknown paths. `npm start` runs `scripts/server.mjs`, a dependency-free static
server with the same caching and gzip behaviour — useful for checking a build
locally, or for hosts that run a container rather than serving files.

If you later point a host at the GitHub repo to build on push, set
`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` in its build environment. The check
suites drive the system Edge install through Playwright's `channel` option
and never use the bundled browsers, so downloading them only slows the build.

## Before going live

Search for `TODO` in `index.html` and `scripts/generate-pages.mjs`: the
canonical link and `og:url` are deliberately omitted until the site has a
domain, and `og:image` needs to become an absolute URL for social scrapers to
resolve it.
