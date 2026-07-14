/**
 * Analítica respetuosa de la privacidad.
 *
 * Los eventos NO deben incluir renta, deudas, valores de propiedad,
 * resultados financieros exactos ni identificadores personales.
 * Solo: pantalla, tipo de calculadora, nombre de evento, plataforma,
 * estado categórico y método de share.
 */

import type { AffordabilityScoreStatus } from '@/utils/affordabilityScore';

export type CalculatorAnalyticsType =
  | 'mortgage'
  | 'refinance'
  | 'affordability'
  | 'income-required';

/** Valores enviados a GA (adjusted interno → tight). */
export type AnalyticsResultStatus =
  | 'comfortable'
  | 'reasonable'
  | 'tight'
  | 'risky';

export type AnalyticsShareMethod = 'native' | 'web';

export type AnalyticsEvent =
  | { name: 'screen_view'; screen: string }
  | { name: 'page_view'; screen: string; platform?: string }
  | { name: 'calculator_started'; type: CalculatorAnalyticsType }
  | {
      name: 'calculator_completed';
      type: CalculatorAnalyticsType;
      resultStatus?: AffordabilityScoreStatus | AnalyticsResultStatus;
    }
  | {
      name: 'result_shared';
      type: CalculatorAnalyticsType;
      shareMethod?: AnalyticsShareMethod;
    }
  | { name: 'related_calculator_opened'; from: CalculatorAnalyticsType; to: CalculatorAnalyticsType }
  | { name: 'history_opened'; type: CalculatorAnalyticsType }
  /** @deprecated Preferir calculator_completed — no enviar a GA para evitar duplicados */
  | { name: 'simulation_completed'; type: CalculatorAnalyticsType }
  | { name: 'lead_submitted' };

export interface AnalyticsRepository {
  track(event: AnalyticsEvent): Promise<void>;
  /** Preferir AnalyticsRouteTracker en web; opcional en otras plataformas. */
  trackPageView?(screen: string): Promise<void>;
  trackCalculatorStarted?(type: CalculatorAnalyticsType): Promise<void>;
  trackCalculatorCompleted?(
    type: CalculatorAnalyticsType,
    resultStatus?: AffordabilityScoreStatus | AnalyticsResultStatus,
  ): Promise<void>;
  trackResultShared?(
    type: CalculatorAnalyticsType,
    shareMethod?: AnalyticsShareMethod,
  ): Promise<void>;
  trackRelatedCalculatorOpened?(
    from: CalculatorAnalyticsType,
    to: CalculatorAnalyticsType,
  ): Promise<void>;
  trackHistoryOpened?(type: CalculatorAnalyticsType): Promise<void>;
}
