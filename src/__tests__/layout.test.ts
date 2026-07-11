import { getResponsiveFlags } from '@/theme/layout';

describe('getResponsiveFlags', () => {
  it('usa 1 columna en móvil (390px)', () => {
    expect(getResponsiveFlags(390)).toEqual({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      columnCount: 1,
    });
  });

  it('usa 2 columnas en tablet', () => {
    const flags = getResponsiveFlags(800);
    expect(flags.isTablet).toBe(true);
    expect(flags.columnCount).toBe(2);
  });

  it('marca desktop desde 1024px', () => {
    const flags = getResponsiveFlags(1280);
    expect(flags.isDesktop).toBe(true);
    expect(flags.columnCount).toBe(2);
  });
});
