import { compareMortgageTerms } from '@/utils/mortgageTermComparison';

describe('compareMortgageTerms', () => {
  const base = {
    propertyValueUf: 3500,
    downPaymentUf: 700,
    annualRatePercent: 5.5,
    ufValue: 40_600,
    netMonthlyIncome: 2_500_000,
    otherMonthlyCredits: 0,
  };

  it('incluye dividendo y carga financiera por plazo', () => {
    const rows = compareMortgageTerms(base);
    expect(rows).toHaveLength(3);
    expect(rows[0]!.termYears).toBe(20);
    expect(rows[0]!.monthlyPayment).toBeGreaterThan(rows[2]!.monthlyPayment);
    expect(rows[0]!.financialLoadPercent).toBeGreaterThan(rows[2]!.financialLoadPercent);
    expect(rows[0]!.status).toBeDefined();
    expect(rows[0]!.totalCost).toBe(rows[0]!.monthlyPayment * 20 * 12);
    expect(rows[2]!.totalCost).toBeGreaterThan(rows[0]!.totalCost);
  });
});
