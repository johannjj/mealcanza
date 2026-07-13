import { routes } from '@/navigation/routes';

/**
 * Rutas públicas indexables (canónicas).
 * Fuente única para sitemap, validación SEO y metadata.
 */
export type IndexableRoute = {
  path: string;
  /** Prioridad relativa en sitemap (0–1). */
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

export const indexableRoutes: IndexableRoute[] = [
  { path: routes.home, priority: 1.0, changefreq: 'weekly' },
  { path: routes.vivienda, priority: 0.9, changefreq: 'weekly' },
  { path: routes.mortgage, priority: 0.9, changefreq: 'weekly' },
  { path: routes.refinance, priority: 0.8, changefreq: 'monthly' },
  { path: routes.affordability, priority: 0.8, changefreq: 'monthly' },
  { path: routes.incomeRequired, priority: 0.8, changefreq: 'monthly' },
  { path: routes.learn, priority: 0.7, changefreq: 'monthly' },
  { path: routes.learnUf, priority: 0.6, changefreq: 'monthly' },
  { path: routes.learnLoad, priority: 0.6, changefreq: 'monthly' },
  { path: routes.learnRefinance, priority: 0.6, changefreq: 'monthly' },
  { path: routes.privacy, priority: 0.3, changefreq: 'yearly' },
  { path: routes.terms, priority: 0.3, changefreq: 'yearly' },
  { path: routes.contact, priority: 0.3, changefreq: 'yearly' },
];

/** Redirects 301 legacy → canónica (Amplify + documentación). */
export const legacyRedirects: { from: string; to: string }[] = [
  { from: '/mortgage', to: routes.mortgage },
  { from: '/refinance', to: routes.refinance },
  { from: '/affordability', to: routes.affordability },
  { from: '/income-required', to: routes.incomeRequired },
];
