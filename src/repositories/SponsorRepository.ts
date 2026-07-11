import type { AdPlacement, SponsorAd } from '@/types/ads';

export interface SponsorRepository {
  getAdsByPlacement(placement: AdPlacement): Promise<SponsorAd[]>;
}

/**
 * Futuro: ApiSponsorRepository que consume CMS o API de sponsors.
 */
