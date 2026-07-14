import type {
  AnalyticsEvent,
  AnalyticsRepository,
  AnalyticsResultStatus,
  AnalyticsShareMethod,
  CalculatorAnalyticsType,
} from './AnalyticsRepository';
import type { AffordabilityScoreStatus } from '@/utils/affordabilityScore';

export class NoopAnalyticsRepository implements AnalyticsRepository {
  async track(_event: AnalyticsEvent): Promise<void> {
    // Android / iOS / tests / web sin GA: sin envío
  }

  async trackPageView(screen: string): Promise<void> {
    await this.track({ name: 'page_view', screen });
  }

  async trackCalculatorStarted(type: CalculatorAnalyticsType): Promise<void> {
    await this.track({ name: 'calculator_started', type });
  }

  async trackCalculatorCompleted(
    type: CalculatorAnalyticsType,
    resultStatus?: AffordabilityScoreStatus | AnalyticsResultStatus,
  ): Promise<void> {
    await this.track({ name: 'calculator_completed', type, resultStatus });
  }

  async trackResultShared(
    type: CalculatorAnalyticsType,
    shareMethod?: AnalyticsShareMethod,
  ): Promise<void> {
    await this.track({ name: 'result_shared', type, shareMethod });
  }

  async trackRelatedCalculatorOpened(
    from: CalculatorAnalyticsType,
    to: CalculatorAnalyticsType,
  ): Promise<void> {
    await this.track({ name: 'related_calculator_opened', from, to });
  }

  async trackHistoryOpened(type: CalculatorAnalyticsType): Promise<void> {
    await this.track({ name: 'history_opened', type });
  }
}
