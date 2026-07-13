import { routes } from '@/navigation/routes';
import type { AppRoute } from '@/navigation/routes';

export type RelatedLink = {
  label: string;
  href: AppRoute;
};

export type EducationPageContent = {
  slug: string;
  title: string;
  introduction: string;
  explanation: string;
  exampleTitle: string;
  exampleBody: string;
  chileContext: string;
  sources: string;
  updatedAt: string;
  relatedLinks?: RelatedLink[];
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
      'Cuando la inflación sube, el valor en pesos de una UF también sube. Eso significa que un dividendo fijado en UF puede costar más pesos mes a mes, aunque el monto en UF se mantenga. Por eso conviene mirar tanto el valor en UF como su equivalente en CLP al simular un crédito.\n\n' +
      'La UF no es una moneda que guardes en el banco: es un índice diario publicado por el Banco Central. Los bancos y notarías la usan para fijar montos de créditos, seguros y escrituras de forma estable en el tiempo. Si compras una propiedad de 3.000 UF, ese número no cambia; lo que cambia es cuántos pesos representa cada UF.\n\n' +
      'Al simular un dividendo, la tasa de interés y el plazo definen cuántas UF pagarás al mes. Pero tu bolsillo siente el impacto en pesos: una subida de la UF encarece el mismo dividendo sin que hayas pedido un crédito mayor. Por eso las calculadoras muestran equivalencias en CLP usando el valor del día.',
    exampleTitle: 'Ejemplo numérico',
    exampleBody:
      'Si tu dividendo es 12 UF y la UF vale $40.000, pagas cerca de $480.000. Si la UF sube a $41.000, el mismo dividendo pasa a unos $492.000. La obligación en UF no cambió; cambió su valor en pesos.\n\n' +
      'Imagina una propiedad de 2.800 UF con pie del 20%: financiarías 2.240 UF. Con tasa anual 4,5% y 25 años, el dividendo podría rondar 12 UF. Hoy eso son unos $480.000; si en un año la UF sube 3%, el mismo dividendo sería ~$494.000 sin que hayas refinanciado ni aumentado el crédito.\n\n' +
      'Por eso conviene simular con la UF actual y revisar qué porcentaje de tu renta líquida representa el dividendo en pesos, no solo en UF.',
    chileContext:
      'En Chile, la UF se creó en 1967 y hoy es el estándar para hipotecas, seguros de desgravamen, cotizaciones de departamentos nuevos y muchos contratos de arriendo de largo plazo. El valor se actualiza cada día hábil según la inflación del mes anterior.\n\n' +
      'Si ves un aviso inmobiliario en UF, no es solo una convención: el precio en pesos variará con el índice. Al comparar ofertas, traduce ambas a CLP con la misma fecha de UF para decidir con números comparables.',
    sources:
      'Referencia general: Banco Central de Chile (serie UF diaria) y mindicador.cl para el valor publicado. Esta guía resume conceptos habituales en el mercado hipotecario chileno; no sustituye la letra de tu contrato.',
    updatedAt: 'Actualizado: julio 2026',
    relatedLinks: [
      { label: 'Simular crédito hipotecario', href: routes.mortgage },
      { label: '¿Cuánto debería ganar?', href: routes.incomeRequired },
    ],
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
    title: '¿Cuándo conviene refinanciar?',
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
    updatedAt: 'Actualizado: julio 2026',
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
