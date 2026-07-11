/**
 * Índice ¿Me alcanza? — indicador referencial propio (0–100).
 * NO es evaluación crediticia ni aprobación bancaria.
 * Fórmula encapsulada para poder ajustarla sin tocar la UI.
 */

export type AffordabilityScoreStatus =
  | 'comfortable'
  | 'reasonable'
  | 'adjusted'
  | 'risky';

export type AffordabilityScoreInput = {
  netMonthlyIncome: number;
  monthlyDividend: number;
  otherMonthlyCredits: number;
};

export type AffordabilityScoreResult = {
  score: number;
  status: AffordabilityScoreStatus;
  /** Etiqueta en español para UI */
  label: string;
  /** Carga financiera total (dividendo + otros créditos) / renta */
  totalLoadPercent: number;
  formulaVersion: 'v1';
};

export const AFFORDABILITY_SCORE_FORMULA_VERSION = 'v1' as const;

export const affordabilityScoreLabels: Record<AffordabilityScoreStatus, string> = {
  comfortable: 'Cómodo',
  reasonable: 'Razonable',
  adjusted: 'Ajustado',
  risky: 'Riesgoso',
};

export function getAffordabilityScoreStatus(score: number): AffordabilityScoreStatus {
  if (score >= 80) return 'comfortable';
  if (score >= 60) return 'reasonable';
  if (score >= 40) return 'adjusted';
  return 'risky';
}

/**
 * Calcula el Índice ¿Me alcanza? (0–100).
 * Parte de 100 y resta según carga financiera total y peso de otros créditos.
 */
export function calculateAffordabilityScore(
  input: AffordabilityScoreInput,
): AffordabilityScoreResult | null {
  const { netMonthlyIncome, monthlyDividend, otherMonthlyCredits } = input;
  if (netMonthlyIncome <= 0) return null;
  if (monthlyDividend < 0 || otherMonthlyCredits < 0) return null;

  const totalCommitments = monthlyDividend + otherMonthlyCredits;
  const totalLoadPercent = (totalCommitments / netMonthlyIncome) * 100;

  let score = 100;

  if (totalLoadPercent <= 25) {
    score -= 0;
  } else if (totalLoadPercent <= 30) {
    score -= 10;
  } else if (totalLoadPercent <= 35) {
    score -= 25;
  } else if (totalLoadPercent <= 40) {
    score -= 45;
  } else {
    score -= 65;
  }

  const otherCreditsShare = (otherMonthlyCredits / netMonthlyIncome) * 100;
  if (otherCreditsShare > 10) {
    score -= 10;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const status = getAffordabilityScoreStatus(score);

  return {
    score,
    status,
    label: affordabilityScoreLabels[status],
    totalLoadPercent,
    formulaVersion: AFFORDABILITY_SCORE_FORMULA_VERSION,
  };
}
