import { Platform } from 'react-native';
import { LocalLeadRepository } from '@/repositories/LocalLeadRepository';
import { LocalUserRepository } from '@/repositories/LocalUserRepository';
import { GoogleAnalyticsRepository } from '@/repositories/GoogleAnalyticsRepository';
import { NoopAnalyticsRepository } from '@/repositories/NoopAnalyticsRepository';
import { StaticSponsorRepository } from '@/repositories/StaticSponsorRepository';
import type { LeadRepository } from '@/repositories/LeadRepository';
import type { UserRepository } from '@/repositories/UserRepository';
import type { AnalyticsRepository } from '@/repositories/AnalyticsRepository';
import type { SponsorRepository } from '@/repositories/SponsorRepository';
import { isGoogleAnalyticsConfigured } from '@/services/analytics/googleAnalytics';

function createAnalyticsRepository(): AnalyticsRepository {
  if (Platform.OS === 'web' && isGoogleAnalyticsConfigured()) {
    return new GoogleAnalyticsRepository();
  }
  return new NoopAnalyticsRepository();
}

/**
 * Contenedor simple de dependencias (MVP).
 * Analytics: GA4 solo en web con EXPO_PUBLIC_GA_MEASUREMENT_ID; Noop en nativo/tests.
 */
export const services = {
  leadRepository: new LocalLeadRepository() as LeadRepository,
  userRepository: new LocalUserRepository() as UserRepository,
  analyticsRepository: createAnalyticsRepository(),
  sponsorRepository: new StaticSponsorRepository() as SponsorRepository,
};
