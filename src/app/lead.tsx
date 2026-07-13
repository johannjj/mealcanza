import { LeadFormScreen } from '@/features/leads/LeadFormScreen';
import { PageSeo } from '@/components/seo/PageSeo';
import { seoPages } from '@/constants/seo';

export default function LeadRoute() {
  return (
    <>
      <PageSeo page={seoPages.lead} />
      <LeadFormScreen />
    </>
  );
}
