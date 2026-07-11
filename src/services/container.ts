import { LocalLeadRepository } from '@/repositories/LocalLeadRepository';
import { LocalUserRepository } from '@/repositories/LocalUserRepository';
import { NoopAnalyticsRepository } from '@/repositories/NoopAnalyticsRepository';
import { StaticSponsorRepository } from '@/repositories/StaticSponsorRepository';
import type { LeadRepository } from '@/repositories/LeadRepository';
import type { UserRepository } from '@/repositories/UserRepository';
import type { AnalyticsRepository } from '@/repositories/AnalyticsRepository';
import type { SponsorRepository } from '@/repositories/SponsorRepository';

/**
 * Contenedor simple de dependencias (MVP).
 * Para backend futuro, reemplazar implementaciones:
 * - leadRepository: new ApiLeadRepository(API_URL)
 * - analyticsRepository: new FirebaseAnalyticsRepository()
 */
export const services = {
  leadRepository: new LocalLeadRepository() as LeadRepository,
  userRepository: new LocalUserRepository() as UserRepository,
  analyticsRepository: new NoopAnalyticsRepository() as AnalyticsRepository,
  sponsorRepository: new StaticSponsorRepository() as SponsorRepository,
};
