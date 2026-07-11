import type { FinancialLoadStatus, MortgageInput, MortgageResult } from '@/types/financial';
import { ufToClp } from '@/utils/uf';

const REASONABLE_THRESHOLD = 25;
const ADJUSTED_THRESHOLD = 35;

/**
 * Cuota mensual sistema francés.
 * dividendo = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function calculateFrenchMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number | null {
  if (principal <= 0 || termYears <= 0) return null;

  const months = termYears * 12;
  const monthlyRate = annualRatePercent / 100 / 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  const payment = (principal * monthlyRate * factor) / (factor - 1);

  return Number.isFinite(payment) && payment > 0 ? payment : null;
}

/** Monto máximo de préstamo dado un dividendo objetivo (inverso aproximado del francés). */
export function estimateMaxPrincipalFromPayment(
  monthlyPayment: number,
  annualRatePercent: number,
  termYears: number,
): number {
  const payment = calculateFrenchMonthlyPayment(1, annualRatePercent, termYears);
  if (!payment || payment <= 0) return monthlyPayment * termYears * 12;
  return monthlyPayment / payment;
}

export function getFinancialLoadStatus(loadPercent: number): FinancialLoadStatus {
  if (loadPercent <= REASONABLE_THRESHOLD) return 'reasonable';
  if (loadPercent <= ADJUSTED_THRESHOLD) return 'adjusted';
  return 'risky';
}

export function calculateFinancialLoadPercent(
  monthlyPayment: number,
  otherCredits: number,
  netIncome: number,
): number | null {
  if (netIncome <= 0) return null;
  return ((monthlyPayment + otherCredits) / netIncome) * 100;
}

export function simulateMortgage(input: MortgageInput): MortgageResult | null {
  if (input.ufValue <= 0) return null;

  const propertyValueClp = ufToClp(input.propertyValueUf, input.ufValue);
  const downPaymentUf = input.downPaymentUf;
  const downPaymentClp = ufToClp(downPaymentUf, input.ufValue);
  const principalUf = input.propertyValueUf - downPaymentUf;
  const principal = propertyValueClp - downPaymentClp;

  if (principal <= 0 || principalUf <= 0) return null;

  const monthlyPayment = calculateFrenchMonthlyPayment(
    principal,
    input.annualRatePercent,
    input.termYears,
  );
  if (monthlyPayment === null) return null;

  const financialLoadPercent =
    calculateFinancialLoadPercent(
      monthlyPayment,
      input.otherMonthlyCredits,
      input.netMonthlyIncome,
    ) ?? 100;

  return {
    propertyValueUf: input.propertyValueUf,
    downPaymentUf,
    propertyValueClp,
    downPaymentClp,
    principalUf,
    principal,
    monthlyPayment,
    financialLoadPercent,
    status: getFinancialLoadStatus(financialLoadPercent),
  };
}
