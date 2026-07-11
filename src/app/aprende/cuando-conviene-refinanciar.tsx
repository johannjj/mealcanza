import { EducationArticleScreen } from '@/features/learn/EducationArticleScreen';
import { educationPages } from '@/constants/education';
import { seoPages } from '@/constants/seo';

export default function CuandoConvieneRefinanciarRoute() {
  return (
    <EducationArticleScreen
      content={educationPages['cuando-conviene-refinanciar']}
      seo={seoPages.learnRefinance}
    />
  );
}
