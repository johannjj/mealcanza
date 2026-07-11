import { StyleSheet, Text, View } from 'react-native';
import { ResultHero } from '@/components/ui/ResultHero';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  DisclaimerCard,
  FinancialBreakdownBar,
  RecommendationCard,
  ResultSummary,
  ScenarioComparison,
  ShareableResultCard,
} from '@/components/results';
import { legalCopy, suiteCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { MortgageResult, TermComparisonRow } from '@/types/financial';
import type { MortgageFormValues } from '@/utils/validations';
import {
  calculateAffordabilityScore,
  type AffordabilityScoreResult,
} from '@/utils/affordabilityScore';
import { formatCLP, formatPercent } from '@/utils/currency';
import { formatDateCL } from '@/utils/date';
import {
  formatRatePercent,
  getLoadConsumptionText,
  getMortgageDiagnosticMessage,
  getMortgageRecommendationMessage,
} from '@/utils/mortgageResultMessaging';
import { formatUF } from '@/utils/uf';

type Props = {
  result: MortgageResult;
  values: MortgageFormValues;
  ufValue: number;
  ufDate?: string;
  compareRows: TermComparisonRow[];
  score: AffordabilityScoreResult;
};

const scoreTone = {
  comfortable: 'success' as const,
  reasonable: 'primary' as const,
  adjusted: 'warning' as const,
  risky: 'danger' as const,
};

const scoreIcon = {
  comfortable: '✓',
  reasonable: '✓',
  adjusted: '!',
  risky: '!',
};

export function MortgageResultCard({
  result,
  values,
  ufValue,
  ufDate,
  compareRows,
  score,
}: Props) {
  const remaining = Math.max(
    0,
    values.netMonthlyIncome - result.monthlyPayment - values.otherMonthlyCredits,
  );

  const scenarioRows = compareRows.map((row) => {
    const rowScore = calculateAffordabilityScore({
      netMonthlyIncome: values.netMonthlyIncome,
      monthlyDividend: row.monthlyPayment,
      otherMonthlyCredits: values.otherMonthlyCredits,
    });
    return {
      id: String(row.termYears),
      title: `${row.termYears} años`,
      monthlyPayment: row.monthlyPayment,
      loadPercent: row.financialLoadPercent,
      deltaVsSelected:
        row.termYears === values.termYears
          ? null
          : row.monthlyPayment - result.monthlyPayment,
      totalCost: row.totalCost,
      status: rowScore?.status,
      selected: row.termYears === values.termYears,
    };
  });

  return (
    <View style={styles.wrap}>
      <ResultHero
        label="Tu dividendo estimado"
        value={formatCLP(result.monthlyPayment)}
        suffix="mensuales"
        caption={getLoadConsumptionText(result.financialLoadPercent)}
      />

      <View style={styles.statusRow}>
        <StatusBadge
          label={score.label}
          tone={scoreTone[score.status]}
          icon={scoreIcon[score.status]}
        />
        <Text style={styles.diagnostic}>{getMortgageDiagnosticMessage(score.status)}</Text>
      </View>

      <View style={styles.indexCard}>
        <Text style={styles.indexTitle}>{suiteCopy.affordabilityIndexTitle}</Text>
        <Text style={styles.indexScore}>{score.score}</Text>
        <Text style={styles.indexSub}>{suiteCopy.affordabilityIndexSubtitle}</Text>
        <Text style={styles.indexNote}>
          Indicador propio y referencial. No es evaluación crediticia ni aprobación bancaria.
        </Text>
      </View>

      {ufDate ? (
        <Text style={styles.metaLine}>
          UF utilizada: {formatCLP(ufValue)} · {formatDateCL(ufDate)}
        </Text>
      ) : (
        <Text style={styles.metaLine}>UF utilizada: {formatCLP(ufValue)}</Text>
      )}

      <ResultSummary
        items={[
          { label: 'Propiedad', value: formatUF(result.propertyValueUf) },
          { label: 'Pie', value: formatUF(result.downPaymentUf) },
          {
            label: 'Monto financiado',
            value: formatUF(result.principalUf),
            hint: formatCLP(result.principal),
          },
          { label: 'Tasa anual', value: formatRatePercent(values.annualRatePercent) },
          { label: 'Plazo', value: `${values.termYears} años` },
          { label: 'Otros créditos', value: formatCLP(values.otherMonthlyCredits) },
          {
            label: 'Carga financiera',
            value: formatPercent(result.financialLoadPercent),
          },
        ]}
      />

      <FinancialBreakdownBar
        totalLabel="Renta líquida"
        totalValue={values.netMonthlyIncome}
        segments={[
          {
            key: 'dividend',
            label: 'Dividendo estimado',
            value: result.monthlyPayment,
            pattern: 'solid',
          },
          {
            key: 'credits',
            label: 'Otros créditos',
            value: values.otherMonthlyCredits,
            pattern: 'striped',
          },
          {
            key: 'remaining',
            label: 'Margen restante',
            value: remaining,
            pattern: 'dotted',
          },
        ]}
      />

      <ScenarioComparison
        title="Comparación de plazos"
        footnote="Un plazo mayor reduce el dividendo mensual, pero aumenta el costo total."
        rows={scenarioRows}
      />

      <RecommendationCard
        title="Recomendación"
        message={getMortgageRecommendationMessage(score.status)}
      />

      <ShareableResultCard
        calculationType="Simulación de crédito"
        primaryLabel="Dividendo estimado"
        primaryValue={formatCLP(result.monthlyPayment)}
        statusLabel={score.label}
        secondaryLabel="Propiedad"
        secondaryValue={formatUF(result.propertyValueUf)}
      />

      <DisclaimerCard text={legalCopy.simulationDisclaimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  statusRow: {
    gap: spacing.sm,
  },
  diagnostic: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  indexCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    gap: 4,
  },
  indexTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.mutedText,
    textTransform: 'uppercase',
  },
  indexScore: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  indexSub: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  indexNote: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.mutedText,
    marginTop: spacing.xs,
  },
  metaLine: {
    fontSize: 13,
    color: colors.mutedText,
  },
});
