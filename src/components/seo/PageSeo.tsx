import { SeoHead } from '@/components/seo/SeoHead';
import { buildPageJsonLd } from '@/components/seo/jsonLd';
import type { PageSeoConfig } from '@/constants/seo';

type Props = {
  page: PageSeoConfig;
  /** JSON-LD adicional (FAQ, breadcrumbs ya se agregan desde buildPageJsonLd si aplica). */
  extraJsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: { name: string; path: string }[];
  faqs?: { question: string; answer: string }[];
};

/**
 * Wrapper de SeoHead a partir de la config central `seoPages`.
 */
export function PageSeo({ page, extraJsonLd, breadcrumbs, faqs }: Props) {
  const base = buildPageJsonLd(page, { breadcrumbs, faqs });
  const merged = (() => {
    if (!extraJsonLd) return base;
    const extra = Array.isArray(extraJsonLd) ? extraJsonLd : [extraJsonLd];
    return [...base, ...extra];
  })();

  return (
    <SeoHead
      title={page.title}
      description={page.description}
      canonicalPath={page.path}
      imagePath={page.imagePath}
      type={page.type}
      noIndex={page.noIndex}
      jsonLd={merged.length > 0 ? merged : undefined}
    />
  );
}
