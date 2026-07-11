/** Rutas canónicas de expo-router (file-based en src/app). */
export const routes = {
  home: '/',
  vivienda: '/vivienda',
  mortgage: '/vivienda/simular-credito',
  refinance: '/vivienda/refinanciar',
  affordability: '/vivienda/capacidad-de-pago',
  incomeRequired: '/vivienda/cuanto-deberia-ganar',
  learn: '/aprende',
  learnUf: '/aprende/que-es-la-uf',
  learnLoad: '/aprende/carga-financiera',
  learnRefinance: '/aprende/cuando-conviene-refinanciar',
  privacy: '/privacidad',
  terms: '/terminos',
  contact: '/contacto',
  lead: '/lead',
} as const;

/** Rutas legacy — se mantienen como redirects para no romper deep links Android. */
export const legacyRoutes = {
  mortgage: '/mortgage',
  refinance: '/refinance',
  affordability: '/affordability',
  incomeRequired: '/income-required',
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
