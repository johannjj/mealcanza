import { simulateAffordability } from '@/utils/affordabilityCalculations';

describe('simulateAffordability', () => {
  it('calcula disponible y dividendo recomendado', () => {
    const result = simulateAffordability({
      netSalary: 2_500_000,
      currentHousingCost: 400_000,
      monthlyCredits: 150_000,
      fixedExpenses: 300_000,
      dependents: 1,
    });
    expect(result.availableMonthly).toBeGreaterThan(0);
    expect(result.maxRecommendedDividend).toBe(result.availableMonthly * 0.25);
    expect(result.estimatedPropertyMax).toBeGreaterThan(0);
  });
});
