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
    title: '¿Me alcanza? Calculadoras financieras para Chile',
    description:
      'Calcula dividendos hipotecarios, refinanciamiento, capacidad de pago y la renta necesaria para comprar vivienda usando la UF actual.',
    path: routes.home,
    type: 'website',
  },
  vivienda: {
    title: 'Calculadoras para comprar vivienda en Chile | ¿Me alcanza?',
    description:
      'Evalúa dividendos, pie, capacidad de pago, refinanciamiento y renta necesaria antes de comprar una propiedad en Chile.',
    path: routes.vivienda,
    type: 'website',
  },
  mortgage: {
    title: 'Simulador de crédito hipotecario en Chile | ¿Me alcanza?',
    description:
      'Calcula un dividendo hipotecario estimado usando valor de propiedad en UF, pie, tasa, plazo y renta líquida.',
    path: routes.mortgage,
    type: 'website',
  },
  refinance: {
    title: 'Simulador de refinanciamiento hipotecario | ¿Me alcanza?',
    description:
      'Compara tu dividendo actual con una nueva tasa y estima ahorro mensual, costo de refinanciamiento y plazo de recuperación.',
    path: routes.refinance,
    type: 'website',
  },
  affordability: {
    title: 'Calculadora de capacidad de pago para vivienda | ¿Me alcanza?',
    description:
      'Estima cuánto podrías destinar mensualmente a vivienda considerando renta, créditos y gastos fijos.',
    path: routes.affordability,
    type: 'website',
  },
  incomeRequired: {
    title: '¿Cuánto debo ganar para comprar una propiedad? | ¿Me alcanza?',
    description:
      'Calcula qué renta líquida necesitarías para comprar una propiedad según su valor en UF, pie, tasa y plazo.',
    path: routes.incomeRequired,
    type: 'website',
  },
  learn: {
    title: 'Guías para comprar vivienda y entender la UF | ¿Me alcanza?',
    description:
      'Aprende qué es la UF, cómo calcular tu carga financiera y cuándo podría convenir refinanciar un crédito hipotecario.',
    path: routes.learn,
    type: 'website',
  },
  learnUf: {
    title: '¿Qué es la UF y por qué cambia? | ¿Me alcanza?',
    description:
      'Explicación clara de la Unidad de Fomento en Chile, cómo afecta el dividendo en pesos y un ejemplo numérico simple.',
    path: routes.learnUf,
    type: 'article',
    datePublished: '2025-06-01',
    dateModified: '2026-07-10',
  },
  learnLoad: {
    title: 'Carga financiera del dividendo: 25%, 30% o 35% | ¿Me alcanza?',
    description:
      'Cómo estimar qué porcentaje de tu renta líquida destinar al dividendo y qué implica un escenario cómodo, ajustado o riesgoso.',
    path: routes.learnLoad,
    type: 'article',
    datePublished: '2025-06-01',
    dateModified: '2026-07-10',
  },
  learnRefinance: {
    title: '¿Cuándo conviene refinanciar un crédito hipotecario? | ¿Me alcanza?',
    description:
      'Cómo comparar ahorro mensual, costos de refinanciamiento y meses de recuperación antes de cambiar tu hipoteca.',
    path: routes.learnRefinance,
    type: 'article',
    datePublished: '2025-06-01',
    dateModified: '2026-07-10',
  },
  privacy: {
    title: 'Política de privacidad | ¿Me alcanza?',
    description:
      'Cómo tratamos la información en ¿Me alcanza?: sin registro obligatorio, cálculos locales y sin indexar simulaciones personales.',
    path: routes.privacy,
    type: 'website',
  },
  terms: {
    title: 'Términos de uso | ¿Me alcanza?',
    description:
      'Condiciones de uso de las calculadoras referenciales de ¿Me alcanza? para decisiones financieras en Chile.',
    path: routes.terms,
    type: 'website',
  },
  contact: {
    title: 'Contacto | ¿Me alcanza?',
    description:
      'Cómo contactar al equipo de ¿Me alcanza? para consultas sobre la aplicación y las calculadoras.',
    path: routes.contact,
    type: 'website',
  },
  notFound: {
    title: 'Página no encontrada | ¿Me alcanza?',
    description: 'La página que buscas no existe. Vuelve al inicio o abre una calculadora.',
    path: '/404',
    type: 'website',
    noIndex: true,
  },
  lead: {
    title: 'Solicitar orientación | ¿Me alcanza?',
    description: 'Formulario de orientación local. No se indexa como contenido público.',
    path: routes.lead,
    type: 'website',
    noIndex: true,
  },
} as const satisfies Record<string, PageSeoConfig>;
