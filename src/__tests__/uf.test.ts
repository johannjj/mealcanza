import { formatUF, parseUfInput, ufToClp } from '@/utils/uf';

describe('uf utils', () => {
  it('convierte UF a CLP', () => {
    expect(ufToClp(10, 40_600)).toBe(406_000);
  });

  it('formatea UF', () => {
    expect(formatUF(2500.5)).toContain('UF');
  });

  it('parsea entrada con coma decimal', () => {
    expect(parseUfInput('1.500,5')).toBe(1500.5);
  });
});
