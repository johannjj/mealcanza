/** Configuración global de la app (MVP). */
export const appConfig = {
  appName: 'Hipoteca Chile',
  adsEnabled: false,
  /** Mostrar botón "Solicitar orientación" en Home (desactivado en MVP). */
  orientationEnabled: false,
  /** URL externa para orientación (futuro). Si está vacía, se muestra "Próximamente". */
  orientationExternalUrl: '' as string,
  /** Parámetros por defecto para estimar rango de propiedad en capacidad de pago */
  defaultAnnualRate: 5.5,
  defaultTermYears: 20,
  defaultDownPaymentPercent: 20,
  /** Costo mensual estimado por carga (hijo/dependiente) en CLP */
  dependentMonthlyCostEstimate: 150_000,
} as const;
