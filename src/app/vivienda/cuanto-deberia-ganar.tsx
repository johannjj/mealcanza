import { IncomeRequiredScreen } from '@/modules/housing/screens';
import { PageSeo } from '@/components/seo/PageSeo';
import { seoPages } from '@/constants/seo';

export default function CuantoDeberiaGanarRoute() {
  return (
    <>
      <PageSeo page={seoPages.incomeRequired} />
      <IncomeRequiredScreen />
    </>
  );
}
