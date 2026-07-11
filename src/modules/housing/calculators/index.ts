/** Reexport de calculadoras del módulo vivienda (implementación en utils). */
export {
  calculateFrenchMonthlyPayment,
  calculateFinancialLoadPercent,
  getFinancialLoadStatus,
  simulateMortgage,
} from '@/utils/mortgageCalculations';
export { compareMortgageTerms } from '@/utils/mortgageTermComparison';
export { simulateRefinance } from '@/utils/refinanceCalculations';
export { simulateAffordability } from '@/utils/affordabilityCalculations';
export {
  buildIncomeRequiredAnalysis,
  getIncomeDiagnostic,
} from '@/utils/incomeRequiredCalculations';
