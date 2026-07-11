export type FinancialLoadStatus = 'reasonable' | 'adjusted' | 'risky';

/** Propiedad y pie en UF; renta y créditos en CLP. */
export type MortgageInput = {
  propertyValueUf: number;
  downPaymentUf: number;
  ufValue: number;
  annualRatePercent: number;
  termYears: number;
  netMonthlyIncome: number;
  otherMonthlyCredits: number;
};

export type MortgageResult = {
  propertyValueUf: number;
  downPaymentUf: number;
  propertyValueClp: number;
  downPaymentClp: number;
  principalUf: number;
  /** Monto a financiar en CLP */
  principal: number;
  monthlyPayment: number;
  financialLoadPercent: number;
  status: FinancialLoadStatus;
};

export type RefinanceInput = {
  currentBalance: number;
  currentMonthlyPayment: number;
  currentRatePercent: number;
  newRatePercent: number;
  remainingTermYears: number;
  refinanceCost: number;
};

export type RefinanceResult = {
  newMonthlyPayment: number;
  monthlySavings: number;
  monthsToRecoverCost: number | null;
  annualSavings: number;
  /** Ahorro estimado si se mantiene el ahorro mensual durante el plazo restante */
  remainingTermSavings: number;
};

export type AffordabilityInput = {
  netSalary: number;
  currentHousingCost: number;
  monthlyCredits: number;
  fixedExpenses: number;
  dependents: number;
};

export type IncomeRequiredInput = {
  propertyValueUf: number;
  downPaymentUf: number;
  annualRatePercent: number;
  termYears: number;
  ufValue: number;
  loadPercent: number;
};

export type IncomeRequiredResult = {
  requiredIncome: number;
  monthlyPayment: number;
  propertyValueUf: number;
  propertyValueClp: number;
  downPaymentUf: number;
  downPaymentClp: number;
  principalUf: number;
  principalClp: number;
  loadPercent: number;
  diagnosticMessage: string;
};

export type TermComparisonRow = {
  termYears: number;
  monthlyPayment: number;
  financialLoadPercent: number;
  status: FinancialLoadStatus;
  /** Costo total aproximado = dividendo × meses del plazo */
  totalCost: number;
};

export type AffordabilityResult = {
  availableMonthly: number;
  maxRecommendedDividend: number;
  estimatedPropertyMin: number;
  estimatedPropertyMax: number;
  diagnosticMessage: string;
};
