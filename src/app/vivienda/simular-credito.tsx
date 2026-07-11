import { MortgageSimulatorScreen } from '@/modules/housing/screens';
import { PageSeo } from '@/components/seo/PageSeo';
import { seoPages } from '@/constants/seo';

export default function SimularCreditoRoute() {
  return (
    <>
      <PageSeo page={seoPages.mortgage} />
      <MortgageSimulatorScreen />
    </>
  );
}
