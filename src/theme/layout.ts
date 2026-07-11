/** Breakpoints mobile-first: móvil → tablet → desktop */
export const breakpoints = {
  tablet: 768,
  desktop: 1024,
} as const;

export const layout = {
  /** Ancho máximo del contenido en desktop (centrado) */
  maxContentWidth: 1200,
  /** Ancho máximo sugerido para formularios de simuladores */
  formMaxWidth: 800,
  /** Ancho mínimo sugerido por columna en grillas de 2 columnas */
  minColumnWidth: 280,
  /** Altura mínima táctil (Android / iOS) */
  minTouchTarget: 48,
} as const;

export function getResponsiveFlags(width: number) {
  const isMobile = width < breakpoints.tablet;
  const isTablet = width >= breakpoints.tablet && width < breakpoints.desktop;
  const isDesktop = width >= breakpoints.desktop;

  return {
    isMobile,
    isTablet,
    isDesktop,
    columnCount: isMobile ? 1 : 2,
  };
}
