#!/usr/bin/env node
/**
 * Valida el HTML estático en dist/ tras `expo export --platform web`.
 * Exit code != 0 si hay errores críticos.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

const SITE_URL = (
  process.env.EXPO_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://mealcanza.cl'
).replace(/\/$/, '');

const publicRoutes = [
  '/',
  '/vivienda',
  '/vivienda/simular-credito',
  '/vivienda/refinanciar',
  '/vivienda/capacidad-de-pago',
  '/vivienda/cuanto-deberia-ganar',
  '/aprende',
  '/aprende/que-es-la-uf',
  '/aprende/carga-financiera',
  '/aprende/cuando-conviene-refinanciar',
  '/privacidad',
  '/terminos',
  '/contacto',
];

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function htmlPathForRoute(route) {
  if (route === '/') return join(dist, 'index.html');
  const segments = route.replace(/^\//, '').split('/');
  const candidates = [
    join(dist, ...segments, 'index.html'),
    join(dist, ...segments.slice(0, -1), `${segments[segments.length - 1]}.html`),
  ];
  for (const file of candidates) {
    if (existsSync(file)) return file;
  }
  return candidates[0];
}
function extractMeta(html, attrName, attrValue) {
  const re = new RegExp(
    `<meta[^>]*${attrName}=["']${attrValue}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    'i',
  );
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*${attrName}=["']${attrValue}["'][^>]*>`,
    'i',
  );
  const m2 = html.match(re2);
  return m2 ? m2[1] : null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractCanonical(html) {
  const m = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
  if (m) return m[1];
  const m2 = html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return m2 ? m2[1] : null;
}

function countH1(html) {
  const matches = html.match(/<h1\b[^>]*>/gi);
  return matches ? matches.length : 0;
}

function walkHtmlFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkHtmlFiles(full, acc);
    else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

if (!existsSync(dist)) {
  fail(`No existe dist/. Ejecuta npm run web:build primero.`);
  printAndExit();
}

if (!existsSync(join(dist, 'index.html'))) {
  fail('Falta dist/index.html');
}

if (!existsSync(join(dist, 'robots.txt'))) {
  fail('Falta dist/robots.txt');
}

if (!existsSync(join(dist, 'sitemap.xml'))) {
  fail('Falta dist/sitemap.xml');
}

const ogCandidates = [
  join(dist, 'og', 'mealcanza-cover.png'),
  join(dist, 'og', 'mealcanza-cover.jpg'),
  join(dist, 'og', 'mealcanza-cover.webp'),
];
if (!ogCandidates.some((p) => existsSync(p))) {
  fail('Falta imagen Open Graph en dist/og/mealcanza-cover.(png|jpg|webp)');
}

const titles = new Map();
const descriptions = new Map();

for (const route of publicRoutes) {
  const file = htmlPathForRoute(route);
  if (!existsSync(file)) {
    fail(`Falta HTML para ruta ${route} (esperado: ${relative(root, file)})`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const title = extractTitle(html);
  const description = extractMeta(html, 'name', 'description');
  const canonical = extractCanonical(html);
  const robots = extractMeta(html, 'name', 'robots');

  if (!title) fail(`${route}: sin <title>`);
  if (!description) fail(`${route}: sin meta description`);
  if (!canonical) fail(`${route}: sin canonical`);

  if (title) {
    if (titles.has(title)) fail(`Title duplicado: "${title}" (${titles.get(title)} y ${route})`);
    else titles.set(title, route);
  }
  if (description) {
    if (descriptions.has(description)) {
      fail(
        `Description duplicada: "${description.slice(0, 60)}…" (${descriptions.get(description)} y ${route})`,
      );
    } else descriptions.set(description, route);
  }

  if (canonical) {
    if (/localhost|127\.0\.0\.1/i.test(canonical)) {
      fail(`${route}: canonical con localhost (${canonical})`);
    }
    if (/__EXPO_ROUTER_key/i.test(canonical)) {
      fail(`${route}: canonical con __EXPO_ROUTER_key`);
    }
    if (!canonical.startsWith('https://')) {
      fail(`${route}: canonical no es HTTPS (${canonical})`);
    }
    if (canonical.includes('?')) {
      fail(`${route}: canonical con query string (${canonical})`);
    }
    const expected = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    if (canonical !== expected && canonical !== `${SITE_URL}${route}/`) {
      warn(`${route}: canonical "${canonical}" ≠ esperado "${expected}"`);
    }
  }

  if (robots && /noindex/i.test(robots)) {
    fail(`${route}: página pública con noindex`);
  }

  const h1 = countH1(html);
  if (h1 === 0) warn(`${route}: no se detectó <h1> en HTML estático (puede depender de RN Web)`);
  if (h1 > 1) warn(`${route}: ${h1} elementos <h1> detectados`);
}

// Sitemap checks
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
if (/localhost|127\.0\.0\.1/i.test(sitemap)) fail('sitemap.xml contiene localhost');
if (/\?/.test(sitemap.replace(/\?xml/, ''))) {
  // ignore xml declaration
  const withoutDecl = sitemap.replace(/<\?xml[^?]*\?>/, '');
  if (withoutDecl.includes('?')) fail('sitemap.xml contiene query strings');
}
if (!/https:\/\//.test(sitemap)) fail('sitemap.xml no contiene URLs HTTPS');

for (const route of publicRoutes) {
  const expected = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  if (!sitemap.includes(expected) && !sitemap.includes(`${expected}/`)) {
    fail(`sitemap.xml no incluye ${expected}`);
  }
}

// noindex pages must not be in sitemap
const noIndexPaths = ['/lead', '/404', '/mortgage', '/refinance', '/affordability', '/income-required'];
for (const p of noIndexPaths) {
  if (sitemap.includes(`${SITE_URL}${p}`)) {
    fail(`sitemap.xml no debe incluir ruta noindex/legacy: ${p}`);
  }
}

const robotsTxt = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  warn(`robots.txt debería declarar Sitemap: ${SITE_URL}/sitemap.xml`);
}

function printAndExit() {
  for (const w of warnings) console.warn(`WARN  ${w}`);
  for (const e of errors) console.error(`ERROR ${e}`);
  if (errors.length) {
    console.error(`\nseo:check falló con ${errors.length} error(es), ${warnings.length} aviso(s).`);
    process.exit(1);
  }
  console.log(`seo:check OK (${publicRoutes.length} rutas, ${warnings.length} aviso(s)).`);
  process.exit(0);
}

printAndExit();
