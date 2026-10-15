import { routes } from '@/navigation/routes';
import type { AppRoute } from '@/navigation/routes';

export type RelatedLink = {
  label: string;
  href: AppRoute;
};

export type EducationSection = {
  heading: string;
  body: string;
};

export type EducationFaq = {
  question: string;
  answer: string;
};

export type EducationPageContent = {
  slug: string;
  title: string;
  introduction: string;
  /** H2 de la explicación. Por defecto: «Explicación simple». */
  explanationHeading?: string;
  explanation: string;
  /** Bloques extra con H2 propio, entre la explicación y el ejemplo. */
  sections?: EducationSection[];
  exampleTitle: string;
  exampleBody: string;
  /** H2 del contexto. Por defecto: «Contexto en Chile». */
  chileHeading?: string;
  chileContext: string;
  sources: string;
  updatedAt: string;
  relatedLinks?: RelatedLink[];
  faqs?: EducationFaq[];
  disclaimer: string;
  ctaLabel: string;
  ctaRoute: AppRoute;
};

export const educationPages = {
  'que-es-la-uf': {
    slug: 'que-es-la-uf',
    title: '¿Qué es la UF en Chile?',
    introduction:
      'UF significa Unidad de Fomento. Es una unidad de cuenta chilena que se reajusta con la inflación: no es una moneda ni un saldo que puedas transferir.',
    explanationHeading: 'Qué significa la UF',
    explanation:
      'La UF expresa precios y deudas en una unidad estable, y el peso chileno es lo que se paga. El Banco Central publica el valor de la UF todos los días. Si una vivienda cuesta 3.000 UF, ese número no cambia; lo que cambia es cuántos pesos vale cada UF ese día.',
    sections: [
      {
        heading: 'UF y pesos chilenos',
        body:
          'El peso (CLP) es la moneda. La UF es la unidad en la que se escriben muchos precios de vivienda, pies y dividendos. Para convertir, se multiplica la cantidad de UF por el valor publicado de esa fecha. Si la UF sube, el mismo monto en UF cuesta más pesos. Si baja, cuesta menos. Dos avisos en UF solo son comparables si usas el mismo valor de UF en ambos.',
      },
      {
        heading: 'La UF en un crédito hipotecario',
        body:
          'En Chile el precio, el pie y el saldo del crédito suelen pactarse en UF. La tasa anual y el plazo definen el dividendo en UF, con el sistema francés de cuotas. El banco cobra ese dividendo en pesos, según la UF del periodo de pago. El monto en pesos puede subir aunque no hayas pedido más crédito ni cambiado la tasa. Los seguros de desgravamen e incendio a menudo también van en UF y no van incluidos en el dividendo de esta explicación.',
      },
    ],
    exampleTitle: 'Ejemplo de conversión con una UF hipotética',
    exampleBody:
      'La UF de este ejemplo es $40.000. No es el valor del día: sirve para ver la conversión sin que el número caduque.\n\n' +
      'Una propiedad de 2.800 UF con pie del 20% deja 2.240 UF por financiar. Con tasa anual de 4,5% y 25 años, el dividendo de sistema francés queda cerca de 12,45 UF. Con la UF hipotética de $40.000, eso son unos $498.000. Si esa misma UF fuera de $41.000, los mismos 12,45 UF pasarían a unos $510.000.\n\n' +
      'El crédito en UF no cambió. Cambió el equivalente en pesos. Para ver el dividendo con la UF publicada hoy, usa el simulador: toma el valor del día al calcular.',
    chileHeading: 'Cómo se usa la UF en Chile',
    chileContext:
      'La UF se creó en 1967. Hoy es el estándar de hipotecas, seguros de desgravamen, departamentos nuevos y muchos arriendos de largo plazo. Su valor se actualiza cada día según la inflación del mes anterior.\n\n' +
      'Un aviso inmobiliario en UF no es solo una forma de escribir el precio: en pesos va a moverse con el índice. Para comparar ofertas, pásalas a pesos con la misma fecha de UF.',
    sources:
      'Referencia general: Banco Central de Chile (serie UF diaria) y mindicador.cl para el valor publicado. Esta guía resume conceptos habituales en el mercado hipotecario chileno; no sustituye la letra de tu contrato.',
    updatedAt: 'Actualizado: octubre 2026',
    relatedLinks: [
      { label: 'Simular crédito hipotecario', href: routes.mortgage },
      { label: '¿Cuánto debería ganar?', href: routes.incomeRequired },
    ],
    faqs: [
      {
        question: '¿Qué significa UF?',
        answer:
          'UF significa Unidad de Fomento. Es una unidad de cuenta de Chile que se reajusta con la inflación. No es un billete ni una moneda que se transfiera.',
      },
      {
        question: '¿La UF es lo mismo que el peso?',
        answer:
          'No. El peso es la moneda con la que pagas. La UF es la unidad en la que se pactan muchos precios y dividendos. El pago en pesos sale de multiplicar las UF por el valor publicado de esa fecha.',
      },
      {
        question: '¿Por qué sube el dividendo en pesos si el crédito en UF no cambia?',
        answer:
          'Porque el dividendo pactado en UF se cobra en pesos según la UF de ese pago. Si la UF sube, pagas más pesos por las mismas UF, aunque la tasa y el saldo en UF sigan iguales.',
      },
      {
        question: '¿Cada cuánto cambia la UF?',
        answer:
          'Todos los días. El Banco Central publica la serie diaria y el ajuste sigue la inflación del mes anterior. Esta guía no muestra el valor de hoy.',
      },
      {
        question: '¿Dónde veo el dividendo con la UF de hoy?',
        answer:
          'En el simulador de crédito hipotecario. Al calcular, usa el valor de UF publicado en ese momento. El ejemplo de esta página usa $40.000 solo para ilustrar la conversión.',
      },
    ],
    disclaimer:
      'Esta explicación es educativa y referencial. No constituye asesoría financiera ni una proyección de inflación. El ejemplo usa una UF hipotética, no el valor del día.',
    ctaLabel: 'Simular crédito con UF actual',
    ctaRoute: routes.mortgage,
  },
  'carga-financiera': {
    slug: 'carga-financiera',
    title: '¿Qué porcentaje de mi sueldo debería destinar al dividendo?',
    introduction:
      'La carga financiera del dividendo es el porcentaje de tu renta líquida que destinas al pago mensual de la vivienda. Ayuda a estimar si un escenario es cómodo, ajustado o riesgoso.',
    explanation:
      'Una regla orientativa frecuente es mantener el dividendo en torno al 25–30% de la renta líquida. Por debajo de ~25% suele quedar más margen para otros gastos. Entre 25% y 35% puede ser viable, pero con menos holgura. Sobre 35% el presupuesto suele quedar más tensionado. Cada hogar es distinto: deudas, arriendo actual y ahorro de emergencia importan.\n\n' +
      'Los bancos evalúan más variables que solo este porcentaje: estabilidad laboral, otros créditos, historial y el pie aportado. Aun así, mirar la carga financiera te ayuda a entender si un dividendo es sostenible en tu día a día, más allá de si el banco podría aprobar el monto.\n\n' +
      'Recuerda incluir gastos asociados a la vivienda: gastos comunes, contribuciones, seguros y mantención. No forman parte del dividendo, pero sí del costo real de habitar la propiedad.',
    exampleTitle: 'Ejemplo numérico',
    exampleBody:
      'Con una renta líquida de $1.500.000: un dividendo de $375.000 es 25% (escenario más cómodo); $450.000 es 30% (ajustado); $600.000 es 40% (más riesgoso). Usa estas bandas como referencia, no como regla bancaria.\n\n' +
      'Si además pagas $180.000 en gastos comunes y seguros, el costo total de vivienda sube. Con dividendo de $450.000 (30% de la renta), el desembolso habitacional real puede acercarse al 42% de lo que recibes líquido.\n\n' +
      'Antes de comprometerte, prueba un mes simulado: resta el dividendo estimado y tus gastos fijos del sueldo líquido y revisa si queda margen para imprevistos y ahorro.',
    chileContext:
      'En Chile es común escuchar rangos del 25% al 30% como referencia de “carga sana” del dividendo sobre renta líquida. No hay una ley que fije ese tope para todos los créditos: cada institución aplica políticas propias y puede considerar ingresos complementarios o codeudores.\n\n' +
      'La renta líquida es lo que efectivamente recibes después de descuentos legales (AFP, salud, impuesto, etc.). Usar la renta bruta infla el porcentaje y puede llevarte a sobrestimar tu capacidad real.',
    sources:
      'Orientación basada en prácticas habituales del mercado hipotecario chileno y literatura financiera personal. No reemplaza la evaluación de riesgo de un banco ni asesoría profesional.',
    updatedAt: 'Actualizado: julio 2026',
    relatedLinks: [
      { label: 'Calcular renta necesaria', href: routes.incomeRequired },
      { label: 'Capacidad de pago', href: routes.affordability },
    ],
    disclaimer:
      'Los porcentajes son referenciales y no garantizan aprobación crediticia. Cada banco aplica sus propias políticas.',
    ctaLabel: 'Calcular renta necesaria',
    ctaRoute: routes.incomeRequired,
  },
  'cuando-conviene-refinanciar': {
    slug: 'cuando-conviene-refinanciar',
    title: '¿Cuándo conviene refinanciar un crédito hipotecario?',
    introduction:
      'Refinanciar significa reemplazar tu crédito actual por uno nuevo, generalmente buscando una tasa más baja o una cuota más cómoda. No siempre conviene: hay costos y plazos que hay que comparar.',
    explanation:
      'Conviene evaluar al menos tres cosas: cuánto bajaría tu dividendo mensual, cuánto costaría el cambio (notaría, impuestos, comisiones) y en cuántos meses recuperarías ese costo con el ahorro. Si el ahorro mensual es pequeño o te quedan pocos años de crédito, el refinanciamiento puede no compensar.\n\n' +
      'También importa el plazo restante: extender años puede bajar la cuota pero aumentar el interés total pagado. A veces refinanciar con una tasa menor y mantener el plazo original es la mejor combinación; otras veces conviene acortar plazo si el nuevo dividendo sigue siendo cómodo.\n\n' +
      'Revisa condiciones actuales de tu banco: prepago parcial, seguros asociados y si el crédito tiene tasa fija o variable. Un refinanciamiento no solo cambia la tasa; puede modificar seguros, comisiones y flexibilidad de pagos anticipados.',
    exampleTitle: 'Ejemplo numérico',
    exampleBody:
      'Si tu dividendo baja $80.000 al mes y los costos de refinanciar suman $1.200.000, recuperarías el costo en unos 15 meses. Si planeas vender antes, o si la nueva tasa apenas mejora, el cambio puede no valer la pena.\n\n' +
      'Otro escenario: dividendo actual $620.000, nuevo dividendo $540.000 (ahorro $80.000). Costos totales $1.500.000 → punto de equilibrio en ~19 meses. Si te quedan 8 años de crédito y piensas quedarte en la propiedad, puede tener sentido; si vendes en 12 meses, probablemente no.\n\n' +
      'Compara siempre el ahorro neto en pesos durante el horizonte que realmente mantendrás el crédito, no solo el porcentaje de la nueva tasa.',
    chileContext:
      'En Chile el refinanciamiento hipotecario suele implicar un nuevo mutuo, tasación, estudio de títulos y gastos notariales. Los montos varían según el banco, el monto adeudado y la comuna. Algunos bancos ofrecen portabilidad o mejoras de tasa sin cambiar de institución; en otros casos el traspaso es a un banco distinto.\n\n' +
      'La decisión suele ser más favorable cuando las tasas de mercado bajaron de forma relevante respecto a tu crédito original, o cuando tu perfil mejoró y accedes a mejores condiciones. Si la diferencia es marginal, los costos de tramitación pueden comerse el beneficio.',
    sources:
      'Resumen educativo según prácticas habituales de refinanciamiento hipotecario en Chile. Valida costos, tasas y plazos con tu banco o asesor antes de firmar.',
    updatedAt: 'Actualizado: octubre 2026',
    relatedLinks: [
      { label: 'Comparar refinanciamiento', href: routes.refinance },
      { label: 'Simular crédito', href: routes.mortgage },
    ],
    disclaimer:
      'Esta guía es referencial. Condiciones, tasas y costos reales deben validarse con tu institución financiera.',
    ctaLabel: 'Comparar refinanciamiento',
    ctaRoute: routes.refinance,
  },
} as const satisfies Record<string, EducationPageContent>;
