import type { AdPlacement, SponsorAd } from '@/types/ads';
import type { SponsorRepository } from './SponsorRepository';

const MOCK_ADS: SponsorAd[] = [
  {
    id: 'sponsor_demo_1',
    title: 'Espacio patrocinado',
    description: 'Banner disponible para instituciones financieras aliadas.',
    ctaLabel: 'Más información',
    placement: 'home_top',
  },
  {
    id: 'sponsor_demo_2',
    title: 'Seguros hipotecarios',
    description: 'Compara coberturas al momento de tu crédito.',
    ctaLabel: 'Ver opciones',
    placement: 'result_inline',
  },
  {
    id: 'sponsor_demo_3',
    title: 'Asesoría hipotecaria',
    description: 'Conecta con un ejecutivo especializado.',
    ctaLabel: 'Contactar',
    placement: 'bottom',
  },
];

export class StaticSponsorRepository implements SponsorRepository {
  async getAdsByPlacement(placement: AdPlacement): Promise<SponsorAd[]> {
    return MOCK_ADS.filter((ad) => ad.placement === placement);
  }
}
