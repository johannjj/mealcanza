import { StyleSheet, Text, View } from 'react-native';
import { ResultHero } from '@/components/ui/ResultHero';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  DisclaimerCard,
  RecommendationCard,
  ResultSummary,
  ShareableResultCard,
} from '@/components/results';
import { legalCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { AffordabilityInput, AffordabilityResult } from '@/types/financial';
import { formatCLP, formatPercent } from '@/utils/currency';
import { appConfig } from '@/constants/config';

type Props = {
  result: AffordabilityResult;
  values: AffordabilityInput;
};

function getStatus(available: number): {
  label: string;
  tone: 'success' | 'primary' | 'warning' | 'danger';
  icon: string;
  recommendation: string;
} {
  if (available <= 0) {
    return {
      label: 'Riesgoso',
      tone: 'danger',
      icon: '!',
      recommendation:
        'Tu margen mensual estimado es muy ajustado. Revisa gastos o deudas antes de comprometer un dividendo nuevo.',
    };
  }
  if (resultMaxIsLow(available)) {
    return {
      label: 'Ajustado',
      tone: 'warning',
      icon: '!',
      recommendation:
        'Hay margen, pero es limitado. Compara un pie mayor o una propiedad de menor valor.',
    };
  }
  if (available < 1_500_000) {
    return {
      label: 'Razonable',
      tone: 'primary',
      icon: '✓',
      recommendation:
        'El margen parece manejable. Considera gastos comunes, seguros y un fondo de emergencia.',
    };
  }
  return {
    label: 'Cómodo',
    tone: 'success',
    icon: '✓',
    recommendation:
      'Este margen deja holgura relativa. Aun así, valida condiciones reales con una institución financiera.',
  };
}

function resultMaxIsLow(available: number): boolean {
  return available * 0.25 < 200_000;
}

export function AffordabilityResultCard({ result, values }: Props) {
  const dependentCost = values.dependents * appConfig.dependentMonthlyCostEstimate;
  const declaredLoads =
    values.currentHousingCost + values.monthlyCredits + values.fixedExpenses + dependentCost;
  const committedPercent =
    values.netSalary > 0 ? (declaredLoads / values.netSalary) * 100 : 0;
  const status = getStatus(result.availableMonthly);

  return (
    <View style={styles.wrap}>
      <ResultHero
        label="Margen mensual estimado"
        value={formatCLP(result.availableMonthly)}
        caption={`Dividendo máximo sugerido: ${formatCLP(result.maxRecommendedDividend)}`}
      />

      <StatusBadge label={status.label} tone={status.tone} icon={status.icon} />
      <Text style={styles.diagnostic}>{result.diagnosticMessage}</Text>

      <ResultSummary
        items={[
          { label: 'Renta líquida', value: formatCLP(values.netSalary) },
          { label: 'Vivienda actual', value: formatCLP(values.currentHousingCost) },
          { label: 'Otros créditos', value: formatCLP(values.monthlyCredits) },
          { label: 'Gastos fijos', value: formatCLP(values.fixedExpenses) },
          { label: 'Cargas declaradas', value: formatCLP(declaredLoads) },
          { label: 'Margen disponible', value: formatCLP(result.availableMonthly) },
          {
            label: 'Dividendo máximo sugerido',
            value: formatCLP(result.maxRecommendedDividend),
          },
          {
            label: '% renta comprometido',
            value: formatPercent(committedPercent),
          },
        ]}
      />

      <RecommendationCard title="Recomendación" message={status.recommendation} />

      <ShareableResultCard
        calculationType="Capacidad de pago"
        primaryLabel="Margen mensual estimado"
        primaryValue={formatCLP(result.availableMonthly)}
        statusLabel={status.label}
      />

      <DisclaimerCard text={legalCopy.affordabilityDisclaimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  diagnostic: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
});
