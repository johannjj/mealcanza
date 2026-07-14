import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { usePathname } from 'expo-router';
import {
  initializeGoogleAnalytics,
  isGoogleAnalyticsConfigured,
  normalizeAnalyticsPath,
  trackPageView,
} from '@/services/analytics/googleAnalytics';

/**
 * Montar una sola vez en el layout raíz.
 * Envía page_view en cambios de ruta Expo Router (web).
 */
export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || !isGoogleAnalyticsConfigured()) return;
    initializeGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web' || !isGoogleAnalyticsConfigured()) return;

    const path = normalizeAnalyticsPath(pathname || '/');
    if (lastPathRef.current === path) return;

    // Esperar un tick para que <title> / SeoHead se actualicen.
    // lastPathRef se actualiza al enviar (evita perder el PV en Strict Mode).
    const t = setTimeout(() => {
      if (lastPathRef.current === path) return;
      lastPathRef.current = path;
      trackPageView(path);
    }, 0);

    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
