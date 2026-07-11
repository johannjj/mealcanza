/**
 * Borrador en memoria para precargar calculadoras relacionadas.
 * Sin backend ni persistencia.
 */

export type MortgageDraft = {
  propertyValueUf?: number;
  downPaymentUf?: number;
  annualRatePercent?: number;
  termYears?: number;
  netMonthlyIncome?: number;
  otherMonthlyCredits?: number;
};

export type AffordabilityDraft = {
  netSalary?: number;
  monthlyCredits?: number;
};

export type IncomeRequiredDraft = {
  propertyValueUf?: number;
  downPaymentUf?: number;
  annualRatePercent?: number;
  termYears?: number;
  loadPercent?: number;
};

let mortgageDraft: MortgageDraft | null = null;
let affordabilityDraft: AffordabilityDraft | null = null;
let incomeRequiredDraft: IncomeRequiredDraft | null = null;

export function setMortgageDraft(draft: MortgageDraft): void {
  mortgageDraft = draft;
}

export function consumeMortgageDraft(): MortgageDraft | null {
  const value = mortgageDraft;
  mortgageDraft = null;
  return value;
}

export function peekMortgageDraft(): MortgageDraft | null {
  return mortgageDraft;
}

export function setAffordabilityDraft(draft: AffordabilityDraft): void {
  affordabilityDraft = draft;
}

export function consumeAffordabilityDraft(): AffordabilityDraft | null {
  const value = affordabilityDraft;
  affordabilityDraft = null;
  return value;
}

export function setIncomeRequiredDraft(draft: IncomeRequiredDraft): void {
  incomeRequiredDraft = draft;
}

export function consumeIncomeRequiredDraft(): IncomeRequiredDraft | null {
  const value = incomeRequiredDraft;
  incomeRequiredDraft = null;
  return value;
}
