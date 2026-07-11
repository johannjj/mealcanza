/** Textos legales y de confianza centralizados (no hardcodear en componentes grandes). */
export const suiteCopy = {
  appName: '¿Me alcanza?',
  tagline: 'Finanzas simples para Chile',
  slogan: 'Decide con números, no con suposiciones.',
  motto: 'Decisiones grandes, números simples.',
  moduleHousing: 'Vivienda',
  comingSoon: 'Próximamente',
  upcomingModulesTitle: 'Próximos módulos',
  footerBlurb: 'Calculadoras financieras simples para tomar mejores decisiones en Chile.',
  footerDisclaimer:
    'Las simulaciones son referenciales y no constituyen asesoría financiera ni una oferta de crédito.',
  copyright: '© 2026 ¿Me alcanza?',
  recentSimulationsTitle: 'Simulaciones recientes',
  recentSimulationsPrivacy:
    'Este historial se guarda únicamente en este dispositivo.',
  clearHistory: 'Borrar historial',
  relatedSectionTitle: 'Sigue evaluando tu escenario',
  affordabilityIndexTitle: 'Índice ¿Me alcanza?',
  affordabilityIndexSubtitle: 'Indicador referencial de equilibrio mensual',
  editData: 'Editar datos',
} as const;

export const legalCopy = {
  simulationDisclaimer:
    'Esta simulación es referencial y no constituye asesoría financiera.',
  refinanceDisclaimer:
    'Los resultados de refinanciamiento son estimaciones referenciales. Consulta condiciones reales con tu banco.',
  affordabilityDisclaimer:
    'La capacidad de pago estimada es orientativa. No reemplaza evaluación crediticia formal.',
  incomeRequiredDisclaimer:
    'La renta estimada es referencial según el % de carga financiera seleccionado.',
  calculationReference: 'Cálculo referencial',
  leadConsentLabel: 'Acepto ser contactado respecto a mi solicitud.',
  leadSuccessMessage:
    'Tu solicitud fue registrada localmente. Cuando activemos el servicio, un asesor podrá contactarte.',
  noAccountNeeded: 'No necesitas crear una cuenta para simular.',
  noServerStorage: 'En esta versión los datos del formulario se guardan solo en tu dispositivo.',
  noUnnecessaryPermissions: 'No pedimos permisos innecesarios.',
} as const;

export const navCopy = {
  home: 'Inicio',
  vivienda: 'Vivienda',
  learn: 'Aprende',
  comingSoon: 'Próximamente',
  menu: 'Menú',
  closeMenu: 'Cerrar menú',
} as const;

export const homeCopy = {
  heroTitle: '¿Te alcanza para comprar la vivienda que tienes en mente?',
  heroSubtitle:
    'Calcula cuánto podrías pagar, qué renta necesitarías y cómo cambiaría tu dividendo antes de tomar una decisión.',
  heroPrimaryCta: 'Comenzar simulación',
  heroSecondaryCta: 'Calcular cuánto debería ganar',
  heroTrustLine: 'Usa la UF actual · Sin registro · Cálculos referenciales',
  heroUfLabel: 'UF actual',
  heroUpdated: 'Actualizada',
  heroUpdatedToday: 'Actualizada hoy',
  heroReferential: 'Valor referencial',
  heroSource: 'Fuente: mindicador.cl',
  useCasesTitle: '¿Qué quieres hacer?',
  housingToolsTitle: 'Herramientas de vivienda',
  trustTitle: 'Calculadoras pensadas para Chile',
  trustAuthority:
    'Las simulaciones utilizan indicadores vigentes y fórmulas financieras referenciales para ayudarte a comparar escenarios antes de comprometer tu presupuesto.',
  educationTitle: 'Aprende antes de decidir',
  educationCta: 'Leer',
  orientationSecondary: 'Orientación personalizada',
  orientationSoon: 'Próximamente podrás solicitar orientación desde la app.',
  heroSimulations: 'Simulaciones referenciales con UF actual.',
  heroNote: 'Los resultados no constituyen una oferta de crédito.',
} as const;

export const trustCopy = {
  title: 'Calculadoras pensadas para Chile',
  authority:
    'Las simulaciones utilizan indicadores vigentes y fórmulas financieras referenciales para ayudarte a comparar escenarios antes de comprometer tu presupuesto.',
  items: [
    { icon: '✓', text: 'UF actualizada' },
    { icon: '✓', text: 'Sin registro' },
    { icon: '✓', text: 'Sin compartir datos' },
    { icon: '✓', text: 'Sin permisos innecesarios' },
    { icon: '✓', text: 'Cálculos financieros referenciales' },
    { icon: '✓', text: 'Compatible con decisiones en UF y CLP' },
  ],
} as const;

export const footerCopy = {
  toolsTitle: 'Herramientas',
  learnTitle: 'Aprende',
  legalTitle: 'Legal',
  privacy: 'Política de privacidad',
  terms: 'Términos de uso',
  contact: 'Contacto',
  learnUf: 'Qué es la UF',
  learnLoad: 'Carga financiera',
  learnRefinance: 'Refinanciamiento',
} as const;

/** @deprecated Usar housingTools desde config/modules.ts */
export const homeTools = [
  {
    id: 'mortgage',
    icon: '🏠',
    label: 'Simular crédito',
    description: 'Calcula tu dividendo estimado.',
    route: '/vivienda/simular-credito' as const,
  },
  {
    id: 'refinance',
    icon: '🔄',
    label: 'Refinanciamiento',
    description: 'Descubre si puedes reducir tu dividendo.',
    route: '/vivienda/refinanciar' as const,
  },
  {
    id: 'affordability',
    icon: '📊',
    label: 'Capacidad de pago',
    description: 'Evalúa cuánto puedes comprometer mensualmente.',
    route: '/vivienda/capacidad-de-pago' as const,
  },
  {
    id: 'income',
    icon: '💰',
    label: '¿Cuánto debería ganar?',
    description: 'Descubre qué renta necesitarías para comprar una propiedad.',
    route: '/vivienda/cuanto-deberia-ganar' as const,
  },
] as const;

export const shareCopy = {
  shareResult: 'Compartir resultado',
  compareTerms: 'Comparar plazos',
} as const;

export const simulatorCopy = {
  summaryTitle: 'Resumen',
  editSimulation: 'Editar simulación',
  compareTermsTitle: '¿Cómo cambia tu dividendo según el plazo?',
  mortgageSubmit: 'Ver dividendo estimado',
  refinanceSubmit: 'Ver ahorro estimado',
  affordabilitySubmit: 'Evaluar capacidad',
  incomeRequiredSubmit: 'Ver renta necesaria',
} as const;

export const mortgageCopy = {
  ufFallbackWarning: 'UF referencial usada por falta de conexión.',
  ufLoading: 'Cargando UF del día…',
  screenTitle: 'Simular crédito',
  screenSubtitle: 'Responde en menos de un minuto y conoce tu dividendo estimado.',
  sectionProperty: 'Tu propiedad',
  sectionDownPayment: 'Tu pie',
  sectionCredit: 'Tu crédito',
  sectionFinancial: 'Tu situación financiera',
  propertyQuestion: '¿Cuánto cuesta la propiedad?',
  propertyLabel: 'Valor propiedad (UF)',
  propertyPlaceholder: 'Ej: 3.500 UF',
  propertyHelp: 'Departamento promedio en Santiago',
  downPaymentQuestion: '¿Cuánto tienes ahorrado?',
  downPaymentLabel: 'Pie (UF)',
  downPaymentPlaceholder: 'Ej: 700 UF',
  downPaymentHelpDefault: '20% del valor de una propiedad de 3.500 UF',
  rateLabel: 'Tasa anual (%)',
  termLabel: 'Plazo',
  incomeLabel: 'Renta líquida mensual (CLP)',
  creditsLabel: 'Otros créditos mensuales (CLP)',
  resultDividendLabel: 'Dividendo estimado',
  financedLabel: 'Monto a financiar',
  resultTitle: 'Tu resultado',
  resultPropertyLabel: 'Propiedad',
  loadConsumption: 'El dividendo consumiría el {percent} de tu renta líquida.',
  diagnostic: {
    comfortable: 'Este dividendo dejaría un margen mensual saludable.',
    reasonable: 'El escenario parece manejable con algo de disciplina.',
    adjusted: 'El dividendo podría dejar poco margen mensual.',
    risky: 'Este escenario comprometería una parte alta de tu renta.',
  },
  recommendation: {
    comfortable:
      'Este escenario deja un margen mensual saludable. Mantén además un fondo de emergencia.',
    reasonable:
      'El escenario parece manejable, aunque conviene considerar gastos comunes, seguros y mantenciones.',
    adjusted:
      'El dividendo podría dejar poco margen. Compara un pie mayor o un plazo diferente.',
    risky:
      'Este escenario comprometería una parte alta de tu renta. Considera bajar el valor de la propiedad, aumentar el pie o reducir otras deudas.',
  },
  improveTitle: '¿Quieres mejorar este escenario?',
  improveTips: [
    'Aumentar el pie reduce el dividendo.',
    'Extender el plazo baja el dividendo, pero aumenta el costo total.',
    'Reducir otros créditos mejora tu capacidad de pago.',
  ],
  summaryFinanced: 'Monto financiado',
  summaryUfUsed: 'UF usada',
} as const;

export const incomeRequiredCopy = {
  title: '¿Cuánto debería ganar?',
  subtitle: 'Estima la renta líquida para comprar una propiedad con salud financiera.',
  formHint: 'Ingresa la propiedad que te interesa. No pedimos datos personales.',
  loadLabel: '¿Qué parte de tu sueldo debería destinarse al dividendo?',
  resultLead: 'Para comprar esta propiedad deberías ganar aproximadamente',
  heroSuffix: 'líquidos al mes',
  breakdownTitle: 'Desglose',
  pieCompareTitle: '¿Y si aumentas el pie?',
  termCompareTitle: 'Comparación por plazo',
} as const;

export const financialLoadLabels = {
  reasonable: 'Razonable',
  adjusted: 'Ajustado',
  risky: 'Riesgoso',
} as const;

export const financialLoadEmoji = {
  reasonable: '🟢',
  adjusted: '🟡',
  risky: '🔴',
} as const;
