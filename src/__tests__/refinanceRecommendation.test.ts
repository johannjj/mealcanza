import { getRefinanceRecommendation } from '@/utils/refinanceRecommendation';

describe('getRefinanceRecommendation', () => {
  it('sugiere evaluar si recupera en hasta 24 meses', () => {
    const result = getRefinanceRecommendation({
      monthlySavings: 80_000,
      monthsToRecoverCost: 15,
    });
    expect(result.attractiveness).toBe('evaluate');
    expect(result.message).toContain('interesante para evaluar');
  });

  it('marca intermedio entre 25 y 48 meses', () => {
    const result = getRefinanceRecommendation({
      monthlySavings: 50_000,
      monthsToRecoverCost: 36,
    });
    expect(result.attractiveness).toBe('intermediate');
  });

  it('marca poco atractivo sobre 48 meses o sin ahorro', () => {
    expect(
      getRefinanceRecommendation({ monthlySavings: 10_000, monthsToRecoverCost: 60 })
        .attractiveness,
    ).toBe('unattractive');
    expect(
      getRefinanceRecommendation({ monthlySavings: 0, monthsToRecoverCost: 10 }).attractiveness,
    ).toBe('unattractive');
  });
});
