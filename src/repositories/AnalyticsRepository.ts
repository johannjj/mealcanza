/**
 * Analítica respetuosa de la privacidad.
 *
 * Los eventos NO deben incluir renta, deudas, valores de propiedad,
 * resultados financieros exactos ni identificadores personales.
 * Solo: pantalla, tipo de calculadora, nombre de evento, plataforma.
 */

export type CalculatorAnalyticsType =
  | 'mortgage'
  | 'refinance'
  | 'affordability'
  | 'income-required';

export type AnalyticsEvent =
  | { name: 'screen_view'; screen: string }
  | { name: 'page_view'; screen: string; platform?: string }
  | { name: 'calculator_started'; type: CalculatorAnalyticsType }
  | { name: 'calculator_completed'; type: CalculatorAnalyticsType }
  | { name: 'result_shared'; type: CalculatorAnalyticsType }
  | { name: 'related_calculator_opened'; from: CalculatorAnalyticsType; to: CalculatorAnalyticsType }
  /** @deprecated Preferir calculator_completed */
  | { name: 'simulation_completed'; type: 'mortgage' | 'refinance' | 'affordability' | 'income-required' }
  | { name: 'lead_submitted' };

export interface AnalyticsRepository {
  track(event: AnalyticsEvent): Promise<void>;
  trackPageView?(screen: string): Promise<void>;
  trackCalculatorStarted?(type: CalculatorAnalyticsType): Promise<void>;
  trackCalculatorCompleted?(type: CalculatorAnalyticsType): Promise<void>;
  trackResultShared?(type: CalculatorAnalyticsType): Promise<void>;
  trackRelatedCalculatorOpened?(
    from: CalculatorAnalyticsType,
    to: CalculatorAnalyticsType,
  ): Promise<void>;
}

/**
 * Futuro: FirebaseAnalyticsRepository, AmplitudeRepository, etc.
 * Evitar SDKs invasivos — ver ANALYTICS_PRIVACY.md.
 */
