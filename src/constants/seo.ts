import { DEFAULT_OG_IMAGE_PATH, SITE_URL } from '@/config/site';
import { routes } from '@/navigation/routes';

export type SeoPageType = 'website' | 'article';

export type PageSeoConfig = {
  title: string;
  description: string;
  /** Ruta canónica relativa, sin query ni dominio (ej. /vivienda/simular-credito). */
  path: string;
  type?: SeoPageType;
  imagePath?: string;
  noIndex?: boolean;
  /** Fechas ISO para Article (solo artículos). */
  datePublished?: string;
  dateModified?: string;
};

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  if (!path || path === '/') return `${base}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized.replace(/\/$/, '')}`;
}

export function absoluteImageUrl(imagePath = DEFAULT_OG_IMAGE_PATH): string {
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${SITE_URL.replace(/\/$/, '')}${path}`;
}

export const seoPages = {
  home: {
    title: 'Calculadoras financieras para Chile | Me Alcanza',
    description:
      'Simula un crédito hipotecario en Chile: dividendo, refinanciamiento, capacidad de pago y renta necesaria, con la UF del día. Gratis y referencial.',
    path: routes.home,
    type: 'website',
  },
  vivienda: {
    title: 'Calculadoras para comprar vivienda en Chile | Me Alcanza',
    description:
      'Herramientas para estimar dividendo, pie, capacidad de pago, refinanciamiento y renta necesaria antes de comprar una propiedad en Chile.',
    path: routes.vivienda,
    type: 'website',
  },
  mortgage: {
    title: 'Simulador de Crédito Hipotecario Chile | Me Alcanza',
    description:
      'Simula tu crédito hipotecario en Chile. Estima el dividendo mensual, el pie, la tasa y el costo total con la UF del día. Gratis y referencial.',
    path: routes.mortgage,
    type: 'website',
  },
  refinance: {
    title: 'Refinanciar crédito hipotecario en Chile | Me Alcanza',
    description:
      'Compara tu crédito hipotecario con una nueva tasa. Estima el ahorro mensual y en cuántos meses recuperarías el costo de refinanciar.',
    path: routes.refinance,
    type: 'website',
  },
  affordability: {
    title: 'Calculadora de capacidad de pago en Chile | Me Alcanza',
    description:
      'Estima cuánto podrías destinar al mes a una vivienda en Chile según tu renta líquida, créditos y gastos fijos. Resultado referencial.',
    path: routes.affordability,
    type: 'website',
  },
  incomeRequired: {
    title: '¿Cuánto debo ganar para comprar vivienda? | Me Alcanza',
    description:
      'Calcula la renta líquida estimada para un crédito hipotecario según valor en UF, pie, tasa, plazo y el porcentaje de carga que elijas.',
    path: routes.incomeRequired,
    type: 'website',
  },
  learn: {
    title: 'Guías de UF y crédito hipotecario | Me Alcanza',
    description:
      'Aprende qué es la UF, cómo leer la carga financiera del dividendo y cuándo podría convenir refinanciar un crédito hipotecario en Chile.',
    path: routes.learn,
    type: 'website',
  },
  learnUf: {
    title: '¿Qué es la UF en Chile? Significado | Me Alcanza',
    description:
      'Qué es la UF y qué significa en un crédito hipotecario. Por qué cambia el valor en pesos y cómo afecta el dividendo, con un ejemplo simple.',
    path: routes.learnUf,
    type: 'article',
    datePublished: '2025-06-01',
    dateModified: '2026-10-07',
  },
  learnLoad: {
    title: 'Carga financiera del dividendo hipotecario | Me Alcanza',
    description:
      'Qué porcentaje de la renta líquida suele destinarse al dividendo en Chile y qué implica un escenario cómodo, ajustado o más riesgoso.',
    path: routes.learnLoad,
    type: 'article',
    datePublished: '2025-06-01',
    dateModified: '2026-07-10',
  },
  learnRefinance: {
    title: '¿Cuándo refinanciar un crédito hipotecario? | Me Alcanza',
    description:
      'Cuándo conviene refinanciar un crédito hipotecario en Chile: ahorro mensual, costos de trámite y meses para recuperar el gasto.',
    path: routes.learnRefinance,
    type: 'article',
    datePublished: '2025-06-01',
    dateModified: '2026-10-07',
  },
  privacy: {
    title: 'Política de privacidad | Me Alcanza',
    description:
      'Cómo tratamos la información en Me Alcanza: sin registro obligatorio, cálculos en tu dispositivo y sin indexar simulaciones personales.',
    path: routes.privacy,
    type: 'website',
  },
  terms: {
    title: 'Términos de uso | Me Alcanza',
    description:
      'Condiciones de uso de las calculadoras referenciales de Me Alcanza para estimar créditos y decisiones financieras en Chile.',
    path: routes.terms,
    type: 'website',
  },
  contact: {
    title: 'Contacto | Me Alcanza',
    description:
      'Cómo contactar al equipo de Me Alcanza para consultas sobre la aplicación y las calculadoras financieras.',
    path: routes.contact,
    type: 'website',
  },
  notFound: {
    title: 'Página no encontrada | Me Alcanza',
    description: 'La página que buscas no existe. Vuelve al inicio o abre una calculadora.',
    path: '/404',
    type: 'website',
    noIndex: true,
  },
  lead: {
    title: 'Solicitar orientación | Me Alcanza',
    description: 'Formulario de orientación local. No se indexa como contenido público.',
    path: routes.lead,
    type: 'website',
    noIndex: true,
  },
} as const satisfies Record<string, PageSeoConfig>;
