import { Platform } from 'react-native';

const PARAM = '__EXPO_ROUTER_key';

/**
 * Limpia el query param interno de Expo Router (bug conocido en SDK 52).
 * No afecta SEO: canonicals ya omiten query strings.
 * Solo web / cliente.
 */
export function cleanupExpoRouterKey(): void {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(PARAM)) return;
    url.searchParams.delete(PARAM);
    const next = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState(window.history.state, '', next);
  } catch {
    // ignore
  }
}

/** Observa cambios de URL y limpia el param tras navegación. */
export function setupExpoRouterKeyCleaner(): () => void {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return () => undefined;
  }

  cleanupExpoRouterKey();

  const onChange = () => {
    requestAnimationFrame(() => cleanupExpoRouterKey());
  };

  window.addEventListener('popstate', onChange);

  const originalPush = window.history.pushState.bind(window.history);
  const originalReplace = window.history.replaceState.bind(window.history);

  window.history.pushState = (...args) => {
    const result = originalPush(...args);
    onChange();
    return result;
  };
  window.history.replaceState = (...args) => {
    const result = originalReplace(...args);
    onChange();
    return result;
  };

  return () => {
    window.removeEventListener('popstate', onChange);
    window.history.pushState = originalPush;
    window.history.replaceState = originalReplace;
  };
}
