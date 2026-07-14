#!/usr/bin/env node
/**
 * Genera public/robots.txt y public/sitemap.xml.
 *
 * Descubre rutas indexables desde src/app (Expo Router) y aplica
 * overrides de scripts/seo.config.mjs. Se ejecuta en web:build.
 *
 * lastmod = fecha de modificación real del archivo de ruta (no Date.now() del build).
 */
import {
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  existsSync,
} from 'node:fs';
import { dirname, join, relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  siteUrl as configuredSiteUrl,
  excludeRouteNames,
  routeOverrides,
  defaults,
} from './seo.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const appDir = join(root, 'src', 'app');
const publicDir = join(root, 'public');

const SITE_URL = configuredSiteUrl.replace(/\/$/, '');

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name.startsWith('.') || name.startsWith('_')) continue;
      walk(full, acc);
    } else if (/\.(tsx|ts|jsx|js)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

/** Convierte src/app/vivienda/simular-credito.tsx → /vivienda/simular-credito */
function fileToPath(file) {
  const rel = relative(appDir, file).replace(/\\/g, '/');
  const noExt = rel.slice(0, -extname(rel).length);
  const parts = noExt.split('/').filter(Boolean);

  if (parts.some((p) => excludeRouteNames.has(p) || p.startsWith('+'))) {
    return null;
  }

  const base = basename(noExt);
  if (excludeRouteNames.has(base) || base.startsWith('+') || base.startsWith('_')) {
    return null;
  }

  // index.tsx → directorio padre
  const routeParts = base === 'index' ? parts.slice(0, -1) : parts;
  if (routeParts.length === 0) return '/';
  return `/${routeParts.join('/')}`;
}

function toLastmod(isoMs) {
  return new Date(isoMs).toISOString().slice(0, 10);
}

function discoverRoutes() {
  const files = walk(appDir);
  const byPath = new Map();

  for (const file of files) {
    const path = fileToPath(file);
    if (!path) continue;
    const mtime = statSync(file).mtimeMs;
    const prev = byPath.get(path);
    if (!prev || mtime > prev.mtimeMs) {
      byPath.set(path, { path, mtimeMs: mtime, file });
    }
  }

  // Asegura que overrides conocidos existan aunque falte el archivo (defensivo)
  for (const path of Object.keys(routeOverrides)) {
    if (!byPath.has(path)) {
      byPath.set(path, { path, mtimeMs: Date.now(), file: null });
      console.warn(`[generate-seo-files] WARN: override sin archivo de ruta: ${path}`);
    }
  }

  return [...byPath.values()]
    .map((entry) => {
      const override = routeOverrides[entry.path] ?? {};
      return {
        path: entry.path,
        priority: override.priority ?? defaults.priority,
        changefreq: override.changefreq ?? defaults.changefreq,
        lastmod: toLastmod(entry.mtimeMs),
      };
    })
    .sort((a, b) => {
      if (a.path === '/') return -1;
      if (b.path === '/') return 1;
      return a.path.localeCompare(b.path);
    });
}

function loc(path) {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSitemap(routes) {
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${escapeXml(loc(r.path))}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${Number(r.priority).toFixed(1)}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

const routes = discoverRoutes();
mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, 'robots.txt'), buildRobots(), 'utf8');
writeFileSync(join(publicDir, 'sitemap.xml'), buildSitemap(routes), 'utf8');

console.log(`[generate-seo-files] SITE_URL=${SITE_URL}`);
console.log(
  `[generate-seo-files] Wrote public/robots.txt and public/sitemap.xml (${routes.length} URLs)`,
);
for (const r of routes) {
  console.log(`  - ${r.path} (priority=${r.priority}, lastmod=${r.lastmod})`);
}
