/**
 * Config SEO para generación automática de robots.txt y sitemap.xml.
 *
 * Al agregar una página indexable:
 * 1. Crea el archivo en src/app/... (Expo Router)
 * 2. Opcionalmente ajusta priority/changefreq aquí
 * 3. Ejecuta `npm run seo:generate` o el build web
 *
 * No incluye rutas legacy (/mortgage, /refinance, …): redirigen 301 a canónicas ES.
 */
export const siteUrl =
  process.env.EXPO_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://mealcanza.cl';

/** Archivos / carpetas bajo src/app que no se indexan. */
export const excludeRouteNames = new Set([
  '_layout',
  '+html',
  '+not-found',
  'lead',
  // Legacy EN → redirect 301 (ver public/_redirects.json)
  'mortgage',
  'refinance',
  'affordability',
  'income-required',
]);

/** Prioridad y frecuencia por ruta canónica (override sobre defaults). */
export const routeOverrides = {
  '/': { priority: 1.0, changefreq: 'weekly' },
  '/vivienda': { priority: 0.9, changefreq: 'weekly' },
  '/vivienda/simular-credito': { priority: 0.9, changefreq: 'weekly' },
  '/vivienda/refinanciar': { priority: 0.8, changefreq: 'monthly' },
  '/vivienda/capacidad-de-pago': { priority: 0.8, changefreq: 'monthly' },
  '/vivienda/cuanto-deberia-ganar': { priority: 0.8, changefreq: 'monthly' },
  '/aprende': { priority: 0.7, changefreq: 'monthly' },
  '/aprende/que-es-la-uf': { priority: 0.6, changefreq: 'monthly' },
  '/aprende/carga-financiera': { priority: 0.6, changefreq: 'monthly' },
  '/aprende/cuando-conviene-refinanciar': { priority: 0.6, changefreq: 'monthly' },
  '/privacidad': { priority: 0.3, changefreq: 'yearly' },
  '/terminos': { priority: 0.3, changefreq: 'yearly' },
  '/contacto': { priority: 0.3, changefreq: 'yearly' },
};

export const defaults = {
  priority: 0.5,
  changefreq: 'monthly',
};
