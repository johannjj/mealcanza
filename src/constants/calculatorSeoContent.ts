import { routes } from '@/navigation/routes';
import type { Faq } from '@/components/results/CalculatorExplainer';

export const mortgageFaqs: Faq[] = [
  {
    question: '¿El dividendo incluye seguros?',
    answer:
      'No. El resultado es un dividendo referencial del crédito (sistema francés). Seguros de desgravamen, incendio u otros gastos operacionales no están incluidos.',
  },
  {
    question: '¿Qué tasa debo ingresar?',
    answer:
      'Usa una tasa anual referencial que hayas visto en cotizaciones o simuladores bancarios. La tasa real depende del banco, tu perfil y el producto.',
  },
  {
    question: '¿Qué ocurre si aumento el pie?',
    answer:
      'Al subir el pie baja el monto a financiar y, en general, también el dividendo. También puede mejorar las condiciones que ofrezca un banco, aunque eso no se modela aquí.',
  },
  {
    question: '¿Es mejor 20, 25 o 30 años?',
    answer:
      'Plazos más largos suelen bajar la cuota mensual pero aumentan el interés total. Plazos más cortos suben la cuota y reducen el costo financiero. Compara ambos efectos antes de decidir.',
  },
  {
    question: '¿El resultado garantiza aprobación bancaria?',
    answer:
      'No. Es una estimación educativa. Cada institución aplica sus propias políticas de riesgo, renta y documentación.',
  },
];

export const incomeRequiredFaqs: Faq[] = [
  {
    question: '¿Por qué se usa 25%, 30% o 35%?',
    answer:
      'Son bandas orientativas de carga financiera del dividendo sobre la renta líquida. 25% suele ser más holgado; 30% ajustado; 35% más tensionado. No son reglas oficiales de un banco.',
  },
  {
    question: '¿Se considera la renta familiar?',
    answer:
      'Puedes usar la renta líquida conjunta si ambos ingresos se considerarían en una evaluación real. La herramienta no distingue automáticamente cotitulares.',
  },
  {
    question: '¿Se incluyen otros créditos?',
    answer:
      'En esta calculadora el foco es la renta necesaria para sostener el dividendo con el porcentaje de carga elegido. Otros créditos se evalúan mejor en Capacidad de pago.',
  },
  {
    question: '¿El banco puede usar otro criterio?',
    answer:
      'Sí. Los bancos combinan carga financiera, historial, estabilidad laboral y políticas internas. El resultado aquí es referencial.',
  },
];

export const refinanceFaqs: Faq[] = [
  {
    question: '¿El ahorro mensual garantiza que conviene refinanciar?',
    answer:
      'No. Debes sumar costos (notaría, impuestos, comisiones) y ver en cuántos meses recuperas ese gasto con el ahorro.',
  },
  {
    question: '¿Qué tasa nueva debo usar?',
    answer:
      'Una tasa cotizada o referencial actual. Si aún no tienes oferta, prueba escenarios conservadores y optimistas.',
  },
  {
    question: '¿Se incluyen todos los costos del banco?',
    answer:
      'No. Ingresas un costo estimado. Valida siempre el detalle con la institución antes de firmar.',
  },
];

export const affordabilityFaqs: Faq[] = [
  {
    question: '¿Qué es el margen mensual?',
    answer:
      'Es una estimación de lo que quedaría tras restar créditos, gastos fijos y otras cargas a tu renta líquida.',
  },
  {
    question: '¿El dividendo sugerido es lo máximo que me prestarían?',
    answer:
      'No. Es una guía prudente sobre tu presupuesto. El banco puede aprobar más o menos según sus políticas.',
  },
  {
    question: '¿Debo incluir el arriendo actual?',
    answer:
      'Si hoy pagas arriendo y al comprar dejarías de pagarlo, puedes reflejarlo en el costo de vivienda actual para no duplicar la carga al simular.',
  },
];

export const mortgageRelatedLinks = [
  { label: '¿Qué es la UF?', href: routes.learnUf },
  { label: 'Carga financiera del dividendo', href: routes.learnLoad },
  { label: '¿Cuánto debería ganar?', href: routes.incomeRequired },
];

export const incomeRelatedLinks = [
  { label: 'Simular crédito hipotecario', href: routes.mortgage },
  { label: 'Capacidad de pago', href: routes.affordability },
  { label: 'Carga financiera', href: routes.learnLoad },
];

export const refinanceRelatedLinks = [
  { label: 'Cuándo conviene refinanciar', href: routes.learnRefinance },
  { label: 'Simular crédito', href: routes.mortgage },
];

export const affordabilityRelatedLinks = [
  { label: '¿Cuánto debería ganar?', href: routes.incomeRequired },
  { label: 'Simular crédito', href: routes.mortgage },
  { label: 'Carga financiera', href: routes.learnLoad },
];

type ExplainerSection = { heading: string; body: string };

export const mortgageExplainer = {
  title: 'Cómo funciona',
  intro:
    'El cálculo usa el sistema francés: cuotas fijas a lo largo del plazo, con una tasa anual convertida a mensual.',
  sections: [
    {
      heading: 'Cómo se calcula el dividendo',
      body: 'Se toma el monto a financiar (propiedad menos pie), se aplica la tasa y el plazo, y se obtiene una cuota mensual estimada. Luego se expresa en pesos con la UF de referencia.',
    },
    {
      heading: 'Qué porcentaje del sueldo debería representar',
      body: 'Una referencia frecuente es mantener el dividendo cerca del 25-30% de la renta líquida. Sobre 35% el presupuesto suele quedar más ajustado.',
    },
    {
      heading: 'Diferencias entre 20, 25 y 30 años',
      body: 'A mayor plazo, la cuota baja pero pagas más intereses en total. A menor plazo, la cuota sube y el costo financiero suele bajar.',
    },
  ] as ExplainerSection[],
  whatItCalculates:
    'Estima un dividendo hipotecario referencial con sistema francés, usando valor de propiedad, pie, tasa, plazo y UF.',
  dataUsed:
    'Propiedad y pie en UF, tasa anual, plazo, renta líquida, otros créditos mensuales y UF del día (o valor de respaldo).',
  howToRead:
    'El número principal es el dividendo estimado. El Índice ¿Me alcanza? resume el equilibrio mensual de forma referencial.',
  limitations:
    'No incluye seguros, gastos operacionales ni políticas de un banco. No garantiza aprobación crediticia.',
};

export const refinanceExplainer = {
  title: 'Cómo funciona',
  intro:
    'El simulador compara tu crédito vigente con un escenario de refinanciamiento usando la misma lógica de cuota fija (sistema francés).',
  sections: [
    {
      heading: 'Cómo se compara el dividendo',
      body: 'Se toma el saldo pendiente, la tasa actual y el plazo restante para estimar el dividendo de hoy. Luego se aplica la nueva tasa y plazo para obtener el dividendo refinanciado.',
    },
    {
      heading: 'Cuándo compensa refinanciar',
      body: 'Conviene mirar el ahorro mensual junto con el costo estimado de refinanciar. Si el ahorro es alto y recuperas el gasto en pocos meses, el escenario suele ser más atractivo.',
    },
    {
      heading: 'Costos a considerar',
      body: 'Notaría, impuestos, comisiones y otros gastos bancarios pueden reducir el beneficio real. Ingresa un costo referencial y valida el detalle con tu institución.',
    },
  ] as ExplainerSection[],
  whatItCalculates:
    'Estima el nuevo dividendo y el ahorro mensual si refinanciaras con otra tasa.',
  dataUsed: 'Saldo, dividendo actual, tasas, plazo restante y costo estimado de refinanciar.',
  howToRead:
    'El dato principal es el ahorro mensual. Revisa en cuántos meses recuperarías el costo.',
  limitations:
    'No incluye todos los costos bancarios reales ni garantiza condiciones de refinanciamiento.',
};

export const affordabilityExplainer = {
  title: 'Cómo funciona',
  intro:
    'La calculadora parte de tu renta líquida y resta cargas mensuales para estimar un margen disponible y un dividendo prudente.',
  sections: [
    {
      heading: 'Cómo se calcula el margen mensual',
      body: 'Se restan créditos, gastos fijos, costo de vivienda actual y cargas por dependientes de tu sueldo líquido. Lo que queda es una referencia de margen mensual.',
    },
    {
      heading: 'Qué es el dividendo sugerido',
      body: 'Es una guía prudente sobre cuánto podrías destinar a vivienda sin tensionar el resto de tu presupuesto. No es lo máximo que un banco podría aprobar.',
    },
    {
      heading: 'Cómo usar el resultado',
      body: 'Si el margen es ajustado, conviene revisar otras cargas o simular una propiedad con menor valor. Si es holgado, puedes cruzarlo con el simulador de crédito o la renta necesaria.',
    },
  ] as ExplainerSection[],
  whatItCalculates:
    'Estima un margen mensual y un dividendo máximo sugerido a partir de tu renta y cargas.',
  dataUsed:
    'Sueldo líquido, costo de vivienda actual, créditos, gastos fijos y cargas por dependientes.',
  howToRead:
    'El margen es lo que quedaría tras tus cargas. El dividendo sugerido usa una fracción prudente de ese margen.',
  limitations:
    'No reemplaza evaluación crediticia. No incluye todos los gastos reales del hogar.',
};

export const incomeRequiredExplainer = {
  title: 'Cómo funciona',
  intro:
    'Primero se estima el dividendo de la propiedad con sistema francés; luego se calcula qué renta líquida necesitarías según el porcentaje de carga elegido.',
  sections: [
    {
      heading: 'Cómo se calcula la renta necesaria',
      body: 'Se obtiene el monto a financiar (propiedad menos pie), se aplica tasa y plazo para estimar el dividendo, y se divide por el porcentaje de carga seleccionado (25%, 30% o 35%).',
    },
    {
      heading: 'Qué significa 25%, 30% y 35%',
      body: 'Son bandas orientativas de cuánto de tu renta líquida iría al dividendo. 25% suele ser más holgado; 30% ajustado; 35% más tensionado. No son reglas oficiales de un banco.',
    },
    {
      heading: 'Cómo ajustar pie y plazo',
      body: 'Un pie mayor o un plazo más largo pueden bajar el dividendo y, por tanto, la renta necesaria. Compara escenarios antes de fijar un presupuesto.',
    },
  ] as ExplainerSection[],
  whatItCalculates:
    'Estima la renta líquida necesaria para sostener un dividendo con un porcentaje de carga elegido.',
  dataUsed: 'Propiedad, pie, tasa, plazo, UF y porcentaje máximo de carga financiera.',
  howToRead:
    'El número principal es la renta estimada. Compara 25%, 30% y 35% para ver escenarios más conservadores o ajustados.',
  limitations:
    'Es referencial. No garantiza aprobación ni incluye seguros u otros costos.',
};
