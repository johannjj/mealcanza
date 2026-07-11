import {
  calculateAffordabilityScore,
  getAffordabilityScoreStatus,
} from '@/utils/affordabilityScore';

describe('calculateAffordabilityScore', () => {
  it('da score alto con carga baja', () => {
    const result = calculateAffordabilityScore({
      netMonthlyIncome: 2_000_000,
      monthlyDividend: 400_000,
      otherMonthlyCredits: 0,
    });
    expect(result).not.toBeNull();
    expect(result!.score).toBe(100);
    expect(result!.status).toBe('comfortable');
    expect(result!.label).toBe('Cómodo');
  });

  it('resta puntos por bandas de carga', () => {
    const mid = calculateAffordabilityScore({
      netMonthlyIncome: 1_000_000,
      monthlyDividend: 320_000,
      otherMonthlyCredits: 0,
    });
    expect(mid!.totalLoadPercent).toBeCloseTo(32);
    expect(mid!.score).toBe(75);
    expect(mid!.status).toBe('reasonable');

    const high = calculateAffordabilityScore({
      netMonthlyIncome: 1_000_000,
      monthlyDividend: 450_000,
      otherMonthlyCredits: 0,
    });
    expect(high!.score).toBe(35);
    expect(high!.status).toBe('risky');
  });

  it('resta 10 si otros créditos > 10% de la renta', () => {
    const without = calculateAffordabilityScore({
      netMonthlyIncome: 1_000_000,
      monthlyDividend: 200_000,
      otherMonthlyCredits: 0,
    });
    const withCredits = calculateAffordabilityScore({
      netMonthlyIncome: 1_000_000,
      monthlyDividend: 200_000,
      otherMonthlyCredits: 150_000,
    });
    expect(without!.score - withCredits!.score).toBeGreaterThanOrEqual(10);
  });

  it('limita entre 0 y 100', () => {
    const result = calculateAffordabilityScore({
      netMonthlyIncome: 1_000_000,
      monthlyDividend: 900_000,
      otherMonthlyCredits: 200_000,
    });
    expect(result!.score).toBeGreaterThanOrEqual(0);
    expect(result!.score).toBeLessThanOrEqual(100);
  });

  it('retorna null con renta inválida', () => {
    expect(
      calculateAffordabilityScore({
        netMonthlyIncome: 0,
        monthlyDividend: 100_000,
        otherMonthlyCredits: 0,
      }),
    ).toBeNull();
  });
});

describe('getAffordabilityScoreStatus', () => {
  it('mapea límites de estado', () => {
    expect(getAffordabilityScoreStatus(100)).toBe('comfortable');
    expect(getAffordabilityScoreStatus(80)).toBe('comfortable');
    expect(getAffordabilityScoreStatus(79)).toBe('reasonable');
    expect(getAffordabilityScoreStatus(60)).toBe('reasonable');
    expect(getAffordabilityScoreStatus(59)).toBe('adjusted');
    expect(getAffordabilityScoreStatus(40)).toBe('adjusted');
    expect(getAffordabilityScoreStatus(39)).toBe('risky');
    expect(getAffordabilityScoreStatus(0)).toBe('risky');
  });
});
