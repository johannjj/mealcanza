export type AdPlacement = 'home_top' | 'result_inline' | 'bottom';

export type SponsorAd = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaLabel: string;
  targetUrl?: string;
  placement: AdPlacement;
};
