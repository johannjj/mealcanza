#!/usr/bin/env node
/**
 * Genera public/robots.txt y public/sitemap.xml desde SITE_URL y rutas indexables.
 * No inventa lastmod: omite la etiqueta si no hay fecha real de contenido.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

const SITE_URL = (
  process.env.EXPO_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://mealcanza.cl'
).replace(/\/$/, '');

/** Debe coincidir con src/config/indexableRoutes.ts */
const indexableRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/vivienda', priority: '0.9', changefreq: 'weekly' },
  { path: '/vivienda/simular-credito', priority: '0.9', changefreq: 'weekly' },
  { path: '/vivienda/refinanciar', priority: '0.8', changefreq: 'monthly' },
  { path: '/vivienda/capacidad-de-pago', priority: '0.8', changefreq: 'monthly' },
  { path: '/vivienda/cuanto-deberia-ganar', priority: '0.8', changefreq: 'monthly' },
  { path: '/aprende', priority: '0.7', changefreq: 'monthly' },
  { path: '/aprende/que-es-la-uf', priority: '0.6', changefreq: 'monthly' },
  { path: '/aprende/carga-financiera', priority: '0.6', changefreq: 'monthly' },
  { path: '/aprende/cuando-conviene-refinanciar', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacidad', priority: '0.3', changefreq: 'yearly' },
  { path: '/terminos', priority: '0.3', changefreq: 'yearly' },
  { path: '/contacto', priority: '0.3', changefreq: 'yearly' },
];

function loc(path) {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

function buildSitemap() {
  const urls = indexableRoutes
    .map(
      (r) => `  <url>
    <loc>${loc(r.path)}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
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

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, 'robots.txt'), buildRobots(), 'utf8');
writeFileSync(join(publicDir, 'sitemap.xml'), buildSitemap(), 'utf8');
console.log(`[generate-seo-files] SITE_URL=${SITE_URL}`);
console.log(`[generate-seo-files] Wrote public/robots.txt and public/sitemap.xml (${indexableRoutes.length} URLs)`);
