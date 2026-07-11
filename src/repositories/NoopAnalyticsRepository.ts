import type {
  AnalyticsEvent,
  AnalyticsRepository,
  CalculatorAnalyticsType,
} from './AnalyticsRepository';

export class NoopAnalyticsRepository implements AnalyticsRepository {
  async track(_event: AnalyticsEvent): Promise<void> {
    // MVP: sin envío a servidores de analytics
  }

  async trackPageView(screen: string): Promise<void> {
    await this.track({ name: 'page_view', screen });
  }

  async trackCalculatorStarted(type: CalculatorAnalyticsType): Promise<void> {
    await this.track({ name: 'calculator_started', type });
  }

  async trackCalculatorCompleted(type: CalculatorAnalyticsType): Promise<void> {
    await this.track({ name: 'calculator_completed', type });
  }

  async trackResultShared(type: CalculatorAnalyticsType): Promise<void> {
    await this.track({ name: 'result_shared', type });
  }

  async trackRelatedCalculatorOpened(
    from: CalculatorAnalyticsType,
    to: CalculatorAnalyticsType,
  ): Promise<void> {
    await this.track({ name: 'related_calculator_opened', from, to });
  }
}
