import { SITE_URL } from '@/config/site';
import { absoluteUrl, type PageSeoConfig } from '@/constants/seo';
import { routes } from '@/navigation/routes';

const BRAND_NAME = 'Me Alcanza';
const BRAND_ALTERNATE_NAME = '¿Me alcanza?';

/** Herramientas reales del sitio. El nombre visible no promete un resultado exacto. */
const WEB_APPLICATIONS: Record<string, string> = {
  [routes.mortgage]: 'Simulador de crédito hipotecario',
  [routes.refinance]: 'Simulador de refinanciamiento hipotecario',
  [routes.affordability]: 'Calculadora de capacidad de pago',
  [routes.incomeRequired]: 'Calculadora de renta necesaria para vivienda',
};

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
      name: BRAND_NAME,
      alternateName: BRAND_ALTERNATE_NAME,
      url: `${SITE_URL}/`,
      description: page.description,
      inLanguage: 'es-CL',
      publisher: {
        '@type': 'Organization',
        name: BRAND_NAME,
        alternateName: BRAND_ALTERNATE_NAME,
        url: `${SITE_URL}/`,
      },
    });
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND_NAME,
      alternateName: BRAND_ALTERNATE_NAME,
      url: `${SITE_URL}/`,
    });
  }

  const applicationName = WEB_APPLICATIONS[page.path];
  if (applicationName && !page.noIndex) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: applicationName,
      url,
      description: page.description,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      inLanguage: 'es-CL',
      isAccessibleForFree: true,
      provider: {
        '@type': 'Organization',
        name: BRAND_NAME,
        url: `${SITE_URL}/`,
      },
    });
  }

  if (page.type === 'article' && !page.noIndex) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title.replace(/\s*\|\s*(?:¿Me alcanza\?|Me Alcanza)$/, ''),
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
        name: BRAND_NAME,
        alternateName: BRAND_ALTERNATE_NAME,
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
