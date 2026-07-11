import { appConfig } from '@/config/appConfig';
import type { UfValue } from '@/types/uf';

export type { UfValue };

type MindicadorUfResponse = {
  serie?: Array<{ fecha?: string; valor?: number }>;
};

let memoryCache: { data: UfValue; fetchedAt: number } | null = null;

function isCacheValid(): boolean {
  if (!memoryCache) return false;
  return Date.now() - memoryCache.fetchedAt < appConfig.ufCacheTtlMs;
}

function buildFallbackUf(): UfValue {
  return {
    value: appConfig.fallbackUfValue,
    date: new Date().toISOString(),
    source: 'fallback',
  };
}

async function fetchUfFromApi(): Promise<UfValue> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(appConfig.mindicadorUfUrl, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = (await response.json()) as MindicadorUfResponse;
    const first = json.serie?.[0];
    const value = first?.valor;

    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
      throw new Error('Valor UF inválido en respuesta');
    }

    return {
      value,
      date: first?.fecha ?? new Date().toISOString(),
      source: 'mindicador',
    };
  } finally {
    clearTimeout(timeout);
  }
}

/** Obtiene la UF actual (API mindicador.cl o fallback local). */
export async function getCurrentUf(): Promise<UfValue> {
  if (isCacheValid() && memoryCache) {
    return memoryCache.data;
  }

  try {
    const data = await fetchUfFromApi();
    memoryCache = { data, fetchedAt: Date.now() };
    return data;
  } catch {
    const fallback = buildFallbackUf();
    memoryCache = { data: fallback, fetchedAt: Date.now() };
    return fallback;
  }
}

/** Limpia cache en memoria (útil para reintentar tras reconectar). */
export function clearUfCache(): void {
  memoryCache = null;
}
