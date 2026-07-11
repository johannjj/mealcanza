import type { RefinanceInput, RefinanceResult } from '@/types/financial';
import { calculateFrenchMonthlyPayment } from './mortgageCalculations';

export function simulateRefinance(input: RefinanceInput): RefinanceResult | null {
  if (input.currentBalance <= 0 || input.remainingTermYears <= 0) return null;

  const newMonthlyPayment = calculateFrenchMonthlyPayment(
    input.currentBalance,
    input.newRatePercent,
    input.remainingTermYears,
  );

  if (newMonthlyPayment === null) return null;

  const monthlySavings = input.currentMonthlyPayment - newMonthlyPayment;
  const annualSavings = monthlySavings * 12;

  let monthsToRecoverCost: number | null = null;
  if (monthlySavings > 0 && input.refinanceCost > 0) {
    monthsToRecoverCost = Math.ceil(input.refinanceCost / monthlySavings);
  } else if (monthlySavings <= 0) {
    monthsToRecoverCost = null;
  } else {
    monthsToRecoverCost = 0;
  }

  return {
    newMonthlyPayment,
    monthlySavings,
    monthsToRecoverCost,
    annualSavings,
    remainingTermSavings: monthlySavings * input.remainingTermYears * 12,
  };
}
