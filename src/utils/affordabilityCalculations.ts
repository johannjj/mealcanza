import { appConfig } from '@/constants/config';
import type { AffordabilityInput, AffordabilityResult } from '@/types/financial';
import { estimateMaxPrincipalFromPayment } from './mortgageCalculations';

const MAX_DIVIDEND_RATIO = 0.25;

export function simulateAffordability(input: AffordabilityInput): AffordabilityResult {
  const dependentCost =
    input.dependents * appConfig.dependentMonthlyCostEstimate;

  const availableMonthly =
    input.netSalary -
    input.currentHousingCost -
    input.monthlyCredits -
    input.fixedExpenses -
    dependentCost;

  const safeAvailable = Math.max(0, availableMonthly);
  const maxRecommendedDividend = safeAvailable * MAX_DIVIDEND_RATIO;

  const maxPrincipal = estimateMaxPrincipalFromPayment(
    maxRecommendedDividend,
    appConfig.defaultAnnualRate,
    appConfig.defaultTermYears,
  );

  const downRatio = appConfig.defaultDownPaymentPercent / 100;
  const estimatedPropertyMax =
    downRatio < 1 ? maxPrincipal / (1 - downRatio) : maxPrincipal;
  const estimatedPropertyMin = estimatedPropertyMax * 0.7;

  const diagnosticMessage = buildDiagnosticMessage(availableMonthly, maxRecommendedDividend);

  return {
    availableMonthly,
    maxRecommendedDividend,
    estimatedPropertyMin: Math.max(0, estimatedPropertyMin),
    estimatedPropertyMax: Math.max(0, estimatedPropertyMax),
    diagnosticMessage,
  };
}

function buildDiagnosticMessage(available: number, maxDividend: number): string {
  if (available <= 0) {
    return 'Tu margen mensual estimado es muy ajustado. Conviene revisar gastos o aumentar ingresos antes de comprometer un dividendo nuevo.';
  }
  if (maxDividend < 200_000) {
    return 'Podrías calificar a un crédito modesto. Considera pie mayor o plazo más largo para ampliar opciones.';
  }
  if (maxDividend < 500_000) {
    return 'Tienes capacidad moderada. Compara tasas y evalúa comunas con precios acordes a tu perfil.';
  }
  return 'Tu perfil muestra capacidad relativamente cómoda para un crédito hipotecario, sujeto a evaluación bancaria.';
}
