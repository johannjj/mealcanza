import type { IncomeRequiredInput, IncomeRequiredResult } from '@/types/financial';
import { calculateFrenchMonthlyPayment } from './mortgageCalculations';
import { ufToClp } from './uf';

export type IncomeScenarioRow = {
  label: string;
  downPaymentUf?: number;
  termYears?: number;
  monthlyPayment: number;
  requiredIncome: number;
};

export type IncomeRequiredAnalysis = IncomeRequiredResult & {
  pieScenarios: IncomeScenarioRow[];
  termScenarios: IncomeScenarioRow[];
};

const TERM_OPTIONS = [20, 25, 30] as const;
const PIE_INCREASES = [
  { label: 'Pie actual', multiplier: 1 },
  { label: 'Pie + 10%', multiplier: 1.1 },
  { label: 'Pie + 20%', multiplier: 1.2 },
] as const;

export function getIncomeDiagnostic(requiredIncome: number): string {
  if (requiredIncome < 1_500_000) {
    return 'Objetivo alcanzable para ingresos medios.';
  }
  if (requiredIncome < 3_000_000) {
    return 'Requiere ingresos sobre el promedio nacional.';
  }
  if (requiredIncome < 5_000_000) {
    return 'Objetivo exigente para la mayoría de los hogares.';
  }
  return 'Objetivo de alto ingreso. Considera aumentar pie o extender plazo.';
}

function requiredIncomeFromPayment(monthlyPayment: number, loadPercent: number): number {
  return monthlyPayment / (loadPercent / 100);
}

function computeCore(input: IncomeRequiredInput): Omit<
  IncomeRequiredResult,
  'diagnosticMessage'
> | null {
  if (input.ufValue <= 0 || input.loadPercent <= 0) return null;

  const propertyValueClp = ufToClp(input.propertyValueUf, input.ufValue);
  const downPaymentClp = ufToClp(input.downPaymentUf, input.ufValue);
  const principalUf = input.propertyValueUf - input.downPaymentUf;
  if (principalUf <= 0) return null;

  const principalClp = propertyValueClp - downPaymentClp;
  const monthlyPayment = calculateFrenchMonthlyPayment(
    principalClp,
    input.annualRatePercent,
    input.termYears,
  );

  if (monthlyPayment === null) return null;

  return {
    requiredIncome: requiredIncomeFromPayment(monthlyPayment, input.loadPercent),
    monthlyPayment,
    propertyValueUf: input.propertyValueUf,
    propertyValueClp,
    downPaymentUf: input.downPaymentUf,
    downPaymentClp,
    principalUf,
    principalClp,
    loadPercent: input.loadPercent,
  };
}

export function calculateRequiredIncome(
  input: IncomeRequiredInput,
): IncomeRequiredResult | null {
  const core = computeCore(input);
  if (!core) return null;
  return {
    ...core,
    diagnosticMessage: getIncomeDiagnostic(core.requiredIncome),
  };
}

export function compareIncomeByPie(input: IncomeRequiredInput): IncomeScenarioRow[] {
  return PIE_INCREASES.map(({ label, multiplier }) => {
    const downPaymentUf = Math.min(input.downPaymentUf * multiplier, input.propertyValueUf * 0.99);
    const scenario = computeCore({ ...input, downPaymentUf });
    if (!scenario) {
      return { label, downPaymentUf, monthlyPayment: 0, requiredIncome: 0 };
    }
    return {
      label,
      downPaymentUf,
      monthlyPayment: scenario.monthlyPayment,
      requiredIncome: scenario.requiredIncome,
    };
  }).filter((row) => row.monthlyPayment > 0);
}

export function compareIncomeByTerm(
  input: IncomeRequiredInput,
  terms: readonly number[] = TERM_OPTIONS,
): IncomeScenarioRow[] {
  const rows: IncomeScenarioRow[] = [];
  for (const termYears of terms) {
    const scenario = computeCore({ ...input, termYears });
    if (!scenario) continue;
    rows.push({
      label: `${termYears} años`,
      termYears,
      monthlyPayment: scenario.monthlyPayment,
      requiredIncome: scenario.requiredIncome,
    });
  }
  return rows;
}

export function buildIncomeRequiredAnalysis(
  input: IncomeRequiredInput,
): IncomeRequiredAnalysis | null {
  const core = calculateRequiredIncome(input);
  if (!core) return null;

  return {
    ...core,
    pieScenarios: compareIncomeByPie(input),
    termScenarios: compareIncomeByTerm(input),
  };
}
