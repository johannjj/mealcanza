import Head from 'expo-router/head';
import { Platform } from 'react-native';
import { appConfig } from '@/config/appConfig';
import type { PageSeoConfig } from '@/constants/seo';

type Props = {
  page: PageSeoConfig;
};

function absoluteUrl(path: string): string | undefined {
  if (!appConfig.siteUrl) return undefined;
  const base = appConfig.siteUrl.replace(/\/$/, '');
  const normalized = path === '/' ? '' : path;
  return `${base}${normalized}`;
}

/**
 * Metadata SEO para web. En nativo no renderiza nada (Head es no-op / web-only).
 */
export function PageSeo({ page }: Props) {
  if (Platform.OS !== 'web') return null;

  const url = absoluteUrl(page.path);
  const ogUrl = url ?? page.path;

  return (
    <Head>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:locale" content="es_CL" />
      <meta property="og:site_name" content="¿Me alcanza?" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
    </Head>
  );
}
