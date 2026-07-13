import { SITE_URL } from '@/config/site';
import { absoluteUrl, type PageSeoConfig } from '@/constants/seo';

type BreadcrumbItem = { name: string; path: string };
type FaqItem = { question: string; answer: string };

type BuildOptions = {
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
};

export function buildPageJsonLd(
  page: PageSeoConfig,
  options: BuildOptions = {},
): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [];
  const url = absoluteUrl(page.path);

  if (page.path === '/' && !page.noIndex) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '¿Me alcanza?',
      url: `${SITE_URL}/`,
      description: page.description,
      inLanguage: 'es-CL',
    });
  }

  if (page.type === 'article' && !page.noIndex) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title.replace(/\s*\|\s*¿Me alcanza\?$/, ''),
      description: page.description,
      datePublished: page.datePublished,
      dateModified: page.dateModified ?? page.datePublished,
      inLanguage: 'es-CL',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      publisher: {
        '@type': 'Organization',
        name: '¿Me alcanza?',
        url: `${SITE_URL}/`,
      },
    });
  }

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: options.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  if (options.faqs && options.faqs.length > 0) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: options.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return blocks;
}
