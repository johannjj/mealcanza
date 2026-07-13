/**
 * URL canónica del sitio (sin slash final).
 * Sobrescribir con EXPO_PUBLIC_SITE_URL o SITE_URL en el entorno de build.
 */
const raw =
  (typeof process !== 'undefined' &&
    (process.env.EXPO_PUBLIC_SITE_URL || process.env.SITE_URL)) ||
  'https://mealcanza.cl';

export const SITE_URL = raw.replace(/\/$/, '');

/** Imagen Open Graph por defecto (ruta pública). */
export const DEFAULT_OG_IMAGE_PATH = '/og/mealcanza-cover.png';

/** Meta de verificación Search Console (vacío = no emitir). */
export const GOOGLE_SITE_VERIFICATION =
  (typeof process !== 'undefined' && process.env.EXPO_PUBLIC_GOOGLE_SITE_VERIFICATION) || '';
