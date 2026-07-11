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
import type { RefinanceInput, RefinanceResult } from '@/types/financial';
import { getRefinanceRecommendation } from '@/utils/refinanceRecommendation';
import { formatCLP } from '@/utils/currency';

type Props = {
  result: RefinanceResult;
  values: RefinanceInput;
};

const toneMap = {
  evaluate: 'success' as const,
  intermediate: 'warning' as const,
  unattractive: 'danger' as const,
};

const iconMap = {
  evaluate: '✓',
  intermediate: '!',
  unattractive: '!',
};

export function RefinanceResultCard({ result, values }: Props) {
  const recommendation = getRefinanceRecommendation({
    monthlySavings: result.monthlySavings,
    monthsToRecoverCost: result.monthsToRecoverCost,
  });

  return (
    <View style={styles.wrap}>
      <ResultHero
        label="Ahorro mensual estimado"
        value={formatCLP(result.monthlySavings)}
        suffix="mensuales"
        caption={`Nuevo dividendo estimado: ${formatCLP(result.newMonthlyPayment)}`}
      />

      <StatusBadge
        label={recommendation.title}
        tone={toneMap[recommendation.attractiveness]}
        icon={iconMap[recommendation.attractiveness]}
      />

      <ResultSummary
        items={[
          { label: 'Dividendo actual', value: formatCLP(values.currentMonthlyPayment) },
          { label: 'Nuevo dividendo', value: formatCLP(result.newMonthlyPayment) },
          { label: 'Ahorro anual', value: formatCLP(result.annualSavings) },
          { label: 'Costo refinanciamiento', value: formatCLP(values.refinanceCost) },
          {
            label: 'Meses para recuperar',
            value:
              result.monthsToRecoverCost === null
                ? 'No aplica'
                : `${result.monthsToRecoverCost} meses`,
          },
          {
            label: 'Ahorro en plazo restante',
            value: formatCLP(result.remainingTermSavings),
          },
        ]}
      />

      <RecommendationCard title={recommendation.title} message={recommendation.message} />

      <ShareableResultCard
        calculationType="Refinanciamiento"
        primaryLabel="Ahorro mensual estimado"
        primaryValue={formatCLP(result.monthlySavings)}
        statusLabel={recommendation.title}
      />

      <DisclaimerCard text={legalCopy.refinanceDisclaimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
});
