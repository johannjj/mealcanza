/**
 * Configuración de Google Analytics 4 (solo web).
 * El Measurement ID es público; no es un secreto.
 */
export const GA_MEASUREMENT_ID = (
  process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID ?? ''
).trim();

/** Si true, loguea en consola los eventos (web). No implica enviar desde localhost. */
export const GA_DEBUG =
  (process.env.EXPO_PUBLIC_GA_DEBUG ?? '').trim().toLowerCase() === 'true';

/**
 * Hosts permitidos para envío real.
 * Localhost / 127.0.0.1 nunca envían (salvo override explícito).
 */
export const GA_ALLOW_LOCALHOST =
  (process.env.EXPO_PUBLIC_GA_ALLOW_LOCALHOST ?? '').trim().toLowerCase() ===
  'true';
