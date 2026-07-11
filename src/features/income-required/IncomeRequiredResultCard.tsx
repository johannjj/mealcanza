import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ResultHero } from '@/components/ui/ResultHero';
import {
  DisclaimerCard,
  RecommendationCard,
  ResultSummary,
  ShareableResultCard,
} from '@/components/results';
import { incomeRequiredCopy, legalCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { IncomeRequiredAnalysis } from '@/utils/incomeRequiredCalculations';
import { buildIncomeRequiredAnalysis } from '@/utils/incomeRequiredCalculations';
import type { IncomeRequiredFormValues } from '@/utils/validations';
import { formatCLP, formatPercent } from '@/utils/currency';
import { formatUF } from '@/utils/uf';
import { formatRatePercent } from '@/utils/mortgageResultMessaging';

type Props = {
  analysis: IncomeRequiredAnalysis;
  values: IncomeRequiredFormValues;
  ufValue: number;
  loadPercent: number;
};

export function IncomeRequiredResultCard({
  analysis,
  values,
  ufValue,
  loadPercent,
}: Props) {
  const loadScenarios = useMemo(() => {
    return [25, 30, 35].map((pct) => {
      const scenario = buildIncomeRequiredAnalysis({
        ...values,
        ufValue,
        loadPercent: pct,
      });
      const badge =
        pct === 25 ? 'Más conservador' : pct === 30 ? 'Equilibrado' : 'Más ajustado';
      return {
        id: String(pct),
        badge,
        selected: pct === loadPercent,
        requiredIncome: scenario?.requiredIncome ?? 0,
        monthlyPayment: scenario?.monthlyPayment ?? 0,
      };
    });
  }, [values, ufValue, loadPercent]);

  return (
    <View style={styles.wrap}>
      <ResultHero
        label="Renta líquida estimada necesaria"
        value={formatCLP(analysis.requiredIncome)}
        suffix={incomeRequiredCopy.heroSuffix}
        caption={incomeRequiredCopy.resultLead}
      />

      <Text style={styles.diagnostic}>{analysis.diagnosticMessage}</Text>

      <ResultSummary
        items={[
          { label: 'Propiedad', value: formatUF(analysis.propertyValueUf) },
          { label: 'Pie', value: formatUF(analysis.downPaymentUf) },
          { label: 'Monto financiado', value: formatUF(analysis.principalUf) },
          { label: 'Dividendo estimado', value: formatCLP(analysis.monthlyPayment) },
          { label: '% máximo seleccionado', value: formatPercent(loadPercent) },
          { label: 'Plazo', value: `${values.termYears} años` },
          { label: 'Tasa', value: formatRatePercent(values.annualRatePercent) },
          { label: 'UF', value: formatCLP(ufValue) },
        ]}
      />

      <View style={styles.loadCards}>
        <Text style={styles.loadTitle}>Comparación rápida de renta</Text>
        {loadScenarios.map((row) => (
          <View key={row.id} style={[styles.loadCard, row.selected && styles.loadSelected]}>
            <Text style={styles.loadBadge}>{row.badge}</Text>
            <Text style={styles.loadPct}>Con carga de {row.id}%</Text>
            <Text style={styles.loadValue}>{formatCLP(row.requiredIncome)}</Text>
            <Text style={styles.loadMeta}>Dividendo: {formatCLP(row.monthlyPayment)}</Text>
          </View>
        ))}
      </View>

      <RecommendationCard
        title="Recomendación"
        message="Usa la comparación de carga para elegir un escenario más conservador o más ajustado antes de simular el crédito."
      />

      <ShareableResultCard
        calculationType="Renta necesaria"
        primaryLabel="Renta líquida estimada"
        primaryValue={formatCLP(analysis.requiredIncome)}
        secondaryLabel="Propiedad"
        secondaryValue={formatUF(analysis.propertyValueUf)}
      />

      <DisclaimerCard text={legalCopy.incomeRequiredDisclaimer} />
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
  loadCards: {
    gap: spacing.sm,
  },
  loadTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  loadCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    gap: 4,
  },
  loadSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  loadBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },
  loadPct: {
    fontSize: 14,
    color: colors.mutedText,
  },
  loadValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  loadMeta: {
    fontSize: 13,
    color: colors.mutedText,
  },
});
