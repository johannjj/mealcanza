import { mortgageCopy } from '@/constants/copy';
import { formatPercent } from '@/utils/currency';
import type { AffordabilityScoreStatus } from '@/utils/affordabilityScore';

export function getMortgageDiagnosticMessage(status: AffordabilityScoreStatus): string {
  return mortgageCopy.diagnostic[status];
}

export function getMortgageRecommendationMessage(status: AffordabilityScoreStatus): string {
  return mortgageCopy.recommendation[status];
}

export function getLoadConsumptionText(loadPercent: number): string {
  return mortgageCopy.loadConsumption.replace('{percent}', formatPercent(loadPercent));
}

export function formatRatePercent(value: number): string {
  return `${value.toLocaleString('es-CL', { maximumFractionDigits: 1 })}%`;
}
