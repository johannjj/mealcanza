import { EducationArticleScreen } from '@/features/learn/EducationArticleScreen';
import { educationPages } from '@/constants/education';
import { seoPages } from '@/constants/seo';

export default function CargaFinancieraRoute() {
  return (
    <EducationArticleScreen
      content={educationPages['carga-financiera']}
      seo={seoPages.learnLoad}
    />
  );
}
