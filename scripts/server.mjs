// Production static server for dist/. Dependency-free on purpose: this is a
// pile of pre-built files, and node:http does the job with better control over
// caching and compression than a general-purpose static server would give.
//
//   PORT=3000 node scripts/server.mjs

import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(import.meta.url), '../..', 'dist');
const port = Number(process.env.PORT) || 3000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
};

// Worth compressing; images, fonts and PDFs are already compressed.
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.svg', '.json', '.txt', '.xml']);

/** Resolve a URL path to a file inside dist/, or null. */
async function resolveFile(urlPath) {
  // normalize() collapses ".." before we check the prefix, so a crafted path
  // cannot escape dist/.
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const candidate = normalize(join(root, decoded));
  if (candidate !== root && !candidate.startsWith(root + sep)) return null;

  try {
    const info = await stat(candidate);
    if (info.isDirectory()) {
      const index = join(candidate, 'index.html');
      const indexInfo = await stat(index);
      return indexInfo.isFile() ? { path: index, size: indexInfo.size, mtime: indexInfo.mtime } : null;
    }
    return { path: candidate, size: info.size, mtime: info.mtime };
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD' }).end('Method Not Allowed');
    return;
  }

  let file = await resolveFile(req.url);

  // A missing path with no extension is probably a mistyped page: serve the
  // 404 body but keep the status honest so crawlers do not index it.
  let status = 200;
  if (!file) {
    status = 404;
    file = await resolveFile('/404.html');
  }
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }

  const ext = extname(file.path).toLowerCase();
  const headers = {
    'content-type': TYPES[ext] ?? 'application/octet-stream',
    'x-content-type-options': 'nosniff',
    // Hashed filenames under /assets/ can be cached forever; HTML must not be,
    // or a deploy would not reach anyone still holding the old page.
    'cache-control': req.url.startsWith('/assets/')
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=0, must-revalidate',
    'last-modified': file.mtime.toUTCString(),
  };

  if (req.method === 'HEAD') {
    res.writeHead(status, { ...headers, 'content-length': file.size }).end();
    return;
  }

  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');
  const compress = acceptsGzip && COMPRESSIBLE.has(ext) && file.size > 1024;

  if (compress) {
    res.writeHead(status, { ...headers, 'content-encoding': 'gzip', vary: 'Accept-Encoding' });
    try {
      await pipeline(createReadStream(file.path), createGzip(), res);
    } catch {
      res.destroy();
    }
    return;
  }

  res.writeHead(status, { ...headers, 'content-length': file.size });
  try {
    await pipeline(createReadStream(file.path), res);
  } catch {
    res.destroy();
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`serving ${root} on http://0.0.0.0:${port}`);
});

// Railway sends SIGTERM on redeploy; exit cleanly so requests in flight finish.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
