import Head from 'expo-router/head';
import { Platform } from 'react-native';
import {
  DEFAULT_OG_IMAGE_PATH,
  GOOGLE_SITE_VERIFICATION,
} from '@/config/site';
import { absoluteImageUrl, absoluteUrl } from '@/constants/seo';

export type SeoHeadProps = {
  title: string;
  description: string;
  canonicalPath: string;
  imagePath?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

function normalizeCanonicalPath(path: string): string {
  if (!path || path === '/') return '/';
  const withoutQuery = path.split('?')[0] ?? path;
  const clean = withoutQuery.split('#')[0] ?? withoutQuery;
  const withSlash = clean.startsWith('/') ? clean : `/${clean}`;
  return withSlash.replace(/\/$/, '') || '/';
}

/**
 * Metadata SEO para web. En Android/iOS no renderiza nada.
 */
export function SeoHead({
  title,
  description,
  canonicalPath,
  imagePath = DEFAULT_OG_IMAGE_PATH,
  type = 'website',
  noIndex = false,
  jsonLd,
}: SeoHeadProps) {
  if (Platform.OS !== 'web') return null;

  const path = normalizeCanonicalPath(canonicalPath);
  const canonical = absoluteUrl(path);
  const image = absoluteImageUrl(imagePath);
  const robots = noIndex ? 'noindex,follow' : 'index,follow';
  const jsonLdPayload = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="¿Me alcanza?" />
      <meta property="og:locale" content="es_CL" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {GOOGLE_SITE_VERIFICATION ? (
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      ) : null}

      {jsonLdPayload
        ? jsonLdPayload.map((block, index) => (
            <script
              key={`jsonld-${index}`}
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
            />
          ))
        : null}

      <meta name="application-name" content="¿Me alcanza?" />
      <link rel="alternate" hrefLang="es-CL" href={canonical} />
    </Head>
  );
}
