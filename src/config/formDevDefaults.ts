/**
 * Valores de ejemplo alineados con placeholders — solo para pruebas rápidas.
 * TODO: eliminar antes de producción (volver a 0 en formularios).
 */
import type { AffordabilityFormValues } from '@/utils/validations';
import type { IncomeRequiredFormValues } from '@/utils/validations';
import type { MortgageFormValues } from '@/utils/validations';
import type { RefinanceFormValues } from '@/utils/validations';

export const mortgageFormDevDefaults = {
  propertyValueUf: 3500,
  downPaymentUf: 700,
  annualRatePercent: 5.5,
  termYears: 25,
  netMonthlyIncome: 2_500_000,
  otherMonthlyCredits: 200_000,
} satisfies MortgageFormValues;

export const incomeRequiredFormDevDefaults = {
  propertyValueUf: 3500,
  downPaymentUf: 700,
  annualRatePercent: 5.5,
  termYears: 25,
} satisfies IncomeRequiredFormValues;

export const refinanceFormDevDefaults = {
  currentBalance: 80_000_000,
  currentMonthlyPayment: 650_000,
  currentRatePercent: 6,
  newRatePercent: 4.5,
  remainingTermYears: 15,
  refinanceCost: 500_000,
} satisfies RefinanceFormValues;

export const affordabilityFormDevDefaults = {
  netSalary: 2_500_000,
  currentHousingCost: 600_000,
  monthlyCredits: 200_000,
  fixedExpenses: 800_000,
  dependents: 0,
} satisfies AffordabilityFormValues;
