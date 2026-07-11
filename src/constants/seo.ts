import { routes } from '@/navigation/routes';

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
};

export const seoPages = {
  home: {
    title: '¿Me alcanza? Calculadoras financieras para Chile',
    description:
      'Decide con números, no con suposiciones. Simula créditos hipotecarios, refinanciamiento, capacidad de pago y renta necesaria usando la UF actual.',
    path: routes.home,
  },
  vivienda: {
    title: 'Herramientas de vivienda | ¿Me alcanza?',
    description:
      'Simula crédito hipotecario, refinanciamiento, capacidad de pago y renta necesaria para comprar vivienda en Chile.',
    path: routes.vivienda,
  },
  mortgage: {
    title: 'Simulador de crédito hipotecario en Chile | ¿Me alcanza?',
    description:
      'Calcula un dividendo hipotecario estimado usando valor de propiedad, pie, tasa, plazo y UF actual.',
    path: routes.mortgage,
  },
  refinance: {
    title: 'Simulador de refinanciamiento hipotecario | ¿Me alcanza?',
    description:
      'Compara tu crédito actual con una nueva tasa estimada y evalúa si podrías bajar tu dividendo.',
    path: routes.refinance,
  },
  affordability: {
    title: 'Calculadora de capacidad de pago para vivienda | ¿Me alcanza?',
    description:
      'Evalúa cuánto podrías destinar mensualmente a un dividendo hipotecario según tu renta líquida.',
    path: routes.affordability,
  },
  incomeRequired: {
    title: '¿Cuánto debo ganar para comprar una propiedad? | ¿Me alcanza?',
    description:
      'Calcula la renta líquida necesaria para financiar una propiedad con una carga financiera razonable.',
    path: routes.incomeRequired,
  },
  learn: {
    title: 'Aprende antes de decidir | ¿Me alcanza?',
    description:
      'Guías breves sobre UF, carga financiera y refinanciamiento para tomar mejores decisiones de vivienda.',
    path: routes.learn,
  },
  learnUf: {
    title: '¿Qué es la UF y por qué cambia? | ¿Me alcanza?',
    description:
      'Entiende cómo la Unidad de Fomento afecta el valor de una propiedad y el dividendo hipotecario en Chile.',
    path: routes.learnUf,
  },
  learnLoad: {
    title: '¿Qué porcentaje del sueldo destinar al dividendo? | ¿Me alcanza?',
    description:
      'Conoce la diferencia entre un escenario cómodo, ajustado y riesgoso al pagar un crédito hipotecario.',
    path: routes.learnLoad,
  },
  learnRefinance: {
    title: '¿Cuándo conviene refinanciar? | ¿Me alcanza?',
    description:
      'Aprende a comparar ahorro mensual, costos y plazo de recuperación antes de refinanciar tu hipoteca.',
    path: routes.learnRefinance,
  },
  privacy: {
    title: 'Política de privacidad | ¿Me alcanza?',
    description:
      'Cómo tratamos la información en ¿Me alcanza?: sin registro, sin compartir datos personales y cálculos locales.',
    path: routes.privacy,
  },
  terms: {
    title: 'Términos de uso | ¿Me alcanza?',
    description:
      'Condiciones de uso de las calculadoras referenciales de ¿Me alcanza? para decisiones financieras en Chile.',
    path: routes.terms,
  },
  contact: {
    title: 'Contacto | ¿Me alcanza?',
    description: 'Cómo contactar al equipo de ¿Me alcanza? para consultas sobre la aplicación.',
    path: routes.contact,
  },
} as const satisfies Record<string, PageSeoConfig>;
