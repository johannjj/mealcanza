import type { TermComparisonRow } from '@/types/financial';
import {
  calculateFinancialLoadPercent,
  calculateFrenchMonthlyPayment,
  getFinancialLoadStatus,
} from './mortgageCalculations';
import { ufToClp } from './uf';

const DEFAULT_COMPARE_TERMS = [20, 25, 30] as const;

export function compareMortgageTerms(params: {
  propertyValueUf: number;
  downPaymentUf: number;
  annualRatePercent: number;
  ufValue: number;
  netMonthlyIncome: number;
  otherMonthlyCredits: number;
  terms?: readonly number[];
}): TermComparisonRow[] {
  const terms = params.terms ?? DEFAULT_COMPARE_TERMS;
  const principalUf = params.propertyValueUf - params.downPaymentUf;
  if (principalUf <= 0 || params.ufValue <= 0) return [];

  const principalClp = ufToClp(principalUf, params.ufValue);

  return terms
    .map((termYears) => {
      const monthlyPayment = calculateFrenchMonthlyPayment(
        principalClp,
        params.annualRatePercent,
        termYears,
      );
      if (monthlyPayment === null) return null;

      const financialLoadPercent =
        calculateFinancialLoadPercent(
          monthlyPayment,
          params.otherMonthlyCredits,
          params.netMonthlyIncome,
        ) ?? 100;

      return {
        termYears,
        monthlyPayment,
        financialLoadPercent,
        status: getFinancialLoadStatus(financialLoadPercent),
        totalCost: monthlyPayment * termYears * 12,
      };
    })
    .filter((row): row is TermComparisonRow => row !== null);
}
