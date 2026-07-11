import { RefinanceSimulatorScreen } from '@/modules/housing/screens';
import { PageSeo } from '@/components/seo/PageSeo';
import { seoPages } from '@/constants/seo';

export default function RefinanciarRoute() {
  return (
    <>
      <PageSeo page={seoPages.refinance} />
      <RefinanceSimulatorScreen />
    </>
  );
}
