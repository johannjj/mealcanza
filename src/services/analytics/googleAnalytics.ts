import { Platform } from 'react-native';
import {
  GA_ALLOW_LOCALHOST,
  GA_DEBUG,
  GA_MEASUREMENT_ID,
} from '@/config/analytics';
import { SITE_URL } from '@/config/site';

export type GaEventParams = Record<string, string | number | boolean | undefined>;

function isTestEnv(): boolean {
  return (
    typeof process !== 'undefined' &&
    (process.env.NODE_ENV === 'test' || Boolean(process.env.JEST_WORKER_ID))
  );
}

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

function getAllowedHostname(): string | null {
  try {
    return new URL(SITE_URL).hostname;
  } catch {
    return 'mealcanza.cl';
  }
}

function isAllowedHostname(): boolean {
  if (!hasWindow()) return false;
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return GA_ALLOW_LOCALHOST;
  }
  const allowed = getAllowedHostname();
  if (!allowed) return false;
  return host === allowed || host.endsWith(`.${allowed}`);
}

export function isGoogleAnalyticsConfigured(): boolean {
  return (
    Platform.OS === 'web' && Boolean(GA_MEASUREMENT_ID) && !isTestEnv()
  );
}

/** Listo para enviar eventos reales (web + ID + host permitido + gtag). */
export function isGoogleAnalyticsEnabled(): boolean {
  return (
    isGoogleAnalyticsConfigured() &&
    hasWindow() &&
    isAllowedHostname() &&
    typeof window.gtag === 'function'
  );
}

function debugLog(message: string, payload?: unknown): void {
  if (!GA_DEBUG || Platform.OS !== 'web') return;
  // eslint-disable-next-line no-console
  console.log(`[GA] ${message}`, payload ?? '');
}

/**
 * Carga gtag.js e inicializa GA4.
 * send_page_view: false — los page_view los envía AnalyticsRouteTracker.
 */
export function initializeGoogleAnalytics(): void {
  try {
    if (!isGoogleAnalyticsConfigured() || !hasWindow()) return;
    if (window.__MEALCANZA_GA_INITIALIZED__) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(..._args: unknown[]) {
      // API oficial de gtag usa `arguments` (objeto Arguments).
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    window.__MEALCANZA_GA_INITIALIZED__ = true;
    debugLog('initialized', { id: GA_MEASUREMENT_ID, host: window.location.hostname });
  } catch {
    // Analytics nunca debe romper la app
  }
}

/** Quita query internos de Expo Router y normaliza path. */
export function normalizeAnalyticsPath(path: string): string {
  const withoutQuery = path.split('?')[0]?.split('#')[0] ?? '/';
  if (!withoutQuery || withoutQuery === '') return '/';
  const withSlash = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  if (withSlash !== '/' && withSlash.endsWith('/')) {
    return withSlash.slice(0, -1);
  }
  return withSlash;
}

export function trackPageView(path: string, title?: string): void {
  try {
    const pagePath = normalizeAnalyticsPath(path);
    const pageTitle =
      title ??
      (hasWindow() && typeof document !== 'undefined' ? document.title : undefined);
    const pageLocation =
      hasWindow() && isAllowedHostname()
        ? `${window.location.origin}${pagePath}`
        : pagePath;

    const payload = {
      page_path: pagePath,
      page_location: pageLocation,
      page_title: pageTitle || pagePath,
    };

    if (!isAllowedHostname()) {
      debugLog('page_view skipped (host)', payload);
      return;
    }
    if (!isGoogleAnalyticsEnabled()) {
      debugLog('page_view skipped (not ready)', payload);
      return;
    }

    window.gtag('event', 'page_view', payload);
    debugLog('page_view', payload);
  } catch {
    // silently ignore
  }
}

export function trackEvent(name: string, params?: GaEventParams): void {
  try {
    const clean: Record<string, string | number | boolean> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined) continue;
        clean[key] = value;
      }
    }

    if (!isAllowedHostname()) {
      debugLog(`event skipped (host): ${name}`, clean);
      return;
    }
    if (!isGoogleAnalyticsEnabled()) {
      debugLog(`event skipped (not ready): ${name}`, clean);
      return;
    }

    window.gtag('event', name, clean);
    debugLog(`event: ${name}`, clean);
  } catch {
    // silently ignore
  }
}
