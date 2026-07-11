import { AffordabilityScreen } from '@/modules/housing/screens';
import { PageSeo } from '@/components/seo/PageSeo';
import { seoPages } from '@/constants/seo';

export default function CapacidadDePagoRoute() {
  return (
    <>
      <PageSeo page={seoPages.affordability} />
      <AffordabilityScreen />
    </>
  );
}
