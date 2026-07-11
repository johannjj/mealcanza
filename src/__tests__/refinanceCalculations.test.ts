import { simulateRefinance } from '@/utils/refinanceCalculations';

describe('simulateRefinance', () => {
  it('estima ahorro con tasa menor', () => {
    const result = simulateRefinance({
      currentBalance: 50_000_000,
      currentMonthlyPayment: 450_000,
      currentRatePercent: 6,
      newRatePercent: 4.5,
      remainingTermYears: 15,
      refinanceCost: 800_000,
    });
    expect(result).not.toBeNull();
    expect(result!.newMonthlyPayment).toBeLessThan(450_000);
    expect(result!.monthlySavings).toBeGreaterThan(0);
    expect(result!.annualSavings).toBe(result!.monthlySavings * 12);
    expect(result!.monthsToRecoverCost).toBeGreaterThan(0);
  });

  it('retorna null con saldo inválido', () => {
    expect(
      simulateRefinance({
        currentBalance: 0,
        currentMonthlyPayment: 100_000,
        currentRatePercent: 5,
        newRatePercent: 4,
        remainingTermYears: 10,
        refinanceCost: 0,
      }),
    ).toBeNull();
  });
});
