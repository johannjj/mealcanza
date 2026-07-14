import type {
  AnalyticsEvent,
  AnalyticsRepository,
  AnalyticsResultStatus,
  AnalyticsShareMethod,
  CalculatorAnalyticsType,
} from '@/repositories/AnalyticsRepository';
import type { AffordabilityScoreStatus } from '@/utils/affordabilityScore';
import { trackEvent } from '@/services/analytics/googleAnalytics';

function toGaCalculatorType(type: CalculatorAnalyticsType): string {
  return type === 'income-required' ? 'income_required' : type;
}

/** Mapea estados internos → enums GA (adjusted → tight). */
function toGaResultStatus(
  status?: AffordabilityScoreStatus | AnalyticsResultStatus,
): AnalyticsResultStatus | undefined {
  if (!status) return undefined;
  if (status === 'adjusted') return 'tight';
  if (
    status === 'comfortable' ||
    status === 'reasonable' ||
    status === 'tight' ||
    status === 'risky'
  ) {
    return status;
  }
  return undefined;
}

/**
 * AnalyticsRepository → GA4 (solo eventos permitidos, sin datos financieros).
 * Los page_view de ruta los gestiona AnalyticsRouteTracker; trackPageView es no-op.
 */
export class GoogleAnalyticsRepository implements AnalyticsRepository {
  async track(event: AnalyticsEvent): Promise<void> {
    switch (event.name) {
      case 'calculator_started':
        await this.trackCalculatorStarted(event.type);
        return;
      case 'calculator_completed':
        await this.trackCalculatorCompleted(event.type, event.resultStatus);
        return;
      case 'result_shared':
        await this.trackResultShared(event.type, event.shareMethod);
        return;
      case 'related_calculator_opened':
        await this.trackRelatedCalculatorOpened(event.from, event.to);
        return;
      case 'history_opened':
        await this.trackHistoryOpened(event.type);
        return;
      case 'simulation_completed':
        // Deprecated: evita duplicar calculator_completed
        return;
      case 'page_view':
      case 'screen_view':
        // Page views: AnalyticsRouteTracker
        return;
      case 'lead_submitted':
        trackEvent('lead_submitted');
        return;
      default:
        return;
    }
  }

  async trackPageView(_screen: string): Promise<void> {
    // Intencionalmente vacío: evita duplicar page_view con AnalyticsRouteTracker.
  }

  async trackCalculatorStarted(type: CalculatorAnalyticsType): Promise<void> {
    trackEvent('calculator_started', {
      calculator_type: toGaCalculatorType(type),
    });
  }

  async trackCalculatorCompleted(
    type: CalculatorAnalyticsType,
    resultStatus?: AffordabilityScoreStatus | AnalyticsResultStatus,
  ): Promise<void> {
    const status = toGaResultStatus(resultStatus);
    trackEvent('calculator_completed', {
      calculator_type: toGaCalculatorType(type),
      ...(status ? { result_status: status } : {}),
    });
  }

  async trackResultShared(
    type: CalculatorAnalyticsType,
    shareMethod?: AnalyticsShareMethod,
  ): Promise<void> {
    trackEvent('result_shared', {
      calculator_type: toGaCalculatorType(type),
      ...(shareMethod ? { share_method: shareMethod } : {}),
    });
  }

  async trackRelatedCalculatorOpened(
    from: CalculatorAnalyticsType,
    to: CalculatorAnalyticsType,
  ): Promise<void> {
    trackEvent('related_calculator_opened', {
      source_calculator: toGaCalculatorType(from),
      target_calculator: toGaCalculatorType(to),
    });
  }

  async trackHistoryOpened(type: CalculatorAnalyticsType): Promise<void> {
    trackEvent('history_opened', {
      calculator_type: toGaCalculatorType(type),
    });
  }
}
