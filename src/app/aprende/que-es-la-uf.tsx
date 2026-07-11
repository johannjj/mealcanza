import { EducationArticleScreen } from '@/features/learn/EducationArticleScreen';
import { educationPages } from '@/constants/education';
import { seoPages } from '@/constants/seo';

export default function QueEsLaUfRoute() {
  return (
    <EducationArticleScreen content={educationPages['que-es-la-uf']} seo={seoPages.learnUf} />
  );
}
