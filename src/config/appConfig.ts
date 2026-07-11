/** Configuración de aplicación (UF, fallbacks, enlaces, SEO). */
export const appConfig = {
  /** URL pública del sitio (sin slash final). Vacío → canonical relativo / omitido en OG. */
  siteUrl: '' as string,
  /**
   * URL pública para compartir resultados (web o landing).
   * Vacío → el mensaje de share usa “Disponible próximamente.”
   */
  appUrl: '' as string,
  /** Email de contacto. Vacío → la página de contacto muestra “Próximamente”. */
  contactEmail: '' as string,
  /** URL de descarga (Google Play). Vacío → texto "Disponible pronto en Google Play." */
  appDownloadUrl: '' as string,
  /** UF de respaldo (CLP) si falla mindicador.cl */
  fallbackUfValue: 40_600,
  /** TTL del cache en memoria de la UF (1 hora) */
  ufCacheTtlMs: 60 * 60 * 1000,
  mindicadorUfUrl: 'https://mindicador.cl/api/uf',
} as const;
