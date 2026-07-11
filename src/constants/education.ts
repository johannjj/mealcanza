import { routes } from '@/navigation/routes';
import type { AppRoute } from '@/navigation/routes';

export type EducationPageContent = {
  slug: string;
  title: string;
  introduction: string;
  explanation: string;
  exampleTitle: string;
  exampleBody: string;
  disclaimer: string;
  ctaLabel: string;
  ctaRoute: AppRoute;
};

export const educationPages = {
  'que-es-la-uf': {
    slug: 'que-es-la-uf',
    title: '¿Qué es la UF y por qué cambia?',
    introduction:
      'La Unidad de Fomento (UF) es una unidad de cuenta usada en Chile para expresar valores que se ajustan con la inflación. Muchos créditos hipotecarios y precios de vivienda se cotizan en UF.',
    explanation:
      'Cuando la inflación sube, el valor en pesos de una UF también sube. Eso significa que un dividendo fijado en UF puede costar más pesos mes a mes, aunque el monto en UF se mantenga. Por eso conviene mirar tanto el valor en UF como su equivalente en CLP al simular un crédito.',
    exampleTitle: 'Ejemplo numérico',
    exampleBody:
      'Si tu dividendo es 12 UF y la UF vale $40.000, pagas cerca de $480.000. Si la UF sube a $41.000, el mismo dividendo pasa a unos $492.000. La obligación en UF no cambió; cambió su valor en pesos.',
    disclaimer:
      'Esta explicación es educativa y referencial. No constituye asesoría financiera ni una proyección de inflación.',
    ctaLabel: 'Simular crédito con UF actual',
    ctaRoute: routes.mortgage,
  },
  'carga-financiera': {
    slug: 'carga-financiera',
    title: '¿Qué porcentaje de mi sueldo debería destinar al dividendo?',
    introduction:
      'La carga financiera del dividendo es el porcentaje de tu renta líquida que destinas al pago mensual de la vivienda. Ayuda a estimar si un escenario es cómodo, ajustado o riesgoso.',
    explanation:
      'Una regla orientativa frecuente es mantener el dividendo en torno al 25–30% de la renta líquida. Por debajo de ~25% suele quedar más margen para otros gastos. Entre 25% y 35% puede ser viable, pero con menos holgura. Sobre 35% el presupuesto suele quedar más tensionado. Cada hogar es distinto: deudas, arriendo actual y ahorro de emergencia importan.',
    exampleTitle: 'Ejemplo numérico',
    exampleBody:
      'Con una renta líquida de $1.500.000: un dividendo de $375.000 es 25% (escenario más cómodo); $450.000 es 30% (ajustado); $600.000 es 40% (más riesgoso). Usa estas bandas como referencia, no como regla bancaria.',
    disclaimer:
      'Los porcentajes son referenciales y no garantizan aprobación crediticia. Cada banco aplica sus propias políticas.',
    ctaLabel: 'Calcular renta necesaria',
    ctaRoute: routes.incomeRequired,
  },
  'cuando-conviene-refinanciar': {
    slug: 'cuando-conviene-refinanciar',
    title: '¿Cuándo conviene refinanciar?',
    introduction:
      'Refinanciar significa reemplazar tu crédito actual por uno nuevo, generalmente buscando una tasa más baja o una cuota más cómoda. No siempre conviene: hay costos y plazos que hay que comparar.',
    explanation:
      'Conviene evaluar al menos tres cosas: cuánto bajaría tu dividendo mensual, cuánto costaría el cambio (notaría, impuestos, comisiones) y en cuántos meses recuperarías ese costo con el ahorro. Si el ahorro mensual es pequeño o te quedan pocos años de crédito, el refinanciamiento puede no compensar.',
    exampleTitle: 'Ejemplo numérico',
    exampleBody:
      'Si tu dividendo baja $80.000 al mes y los costos de refinanciar suman $1.200.000, recuperarías el costo en unos 15 meses. Si planeas vender antes, o si la nueva tasa apenas mejora, el cambio puede no valer la pena.',
    disclaimer:
      'Esta guía es referencial. Condiciones, tasas y costos reales deben validarse con tu institución financiera.',
    ctaLabel: 'Comparar refinanciamiento',
    ctaRoute: routes.refinance,
  },
} as const satisfies Record<string, EducationPageContent>;
