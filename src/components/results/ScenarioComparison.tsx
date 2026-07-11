import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { colors, spacing } from '@/theme';
import type { AffordabilityScoreStatus } from '@/utils/affordabilityScore';
import { affordabilityScoreLabels } from '@/utils/affordabilityScore';
import { formatCLP } from '@/utils/currency';
import { formatPercent } from '@/utils/currency';

export type ScenarioComparisonRow = {
  id: string;
  title: string;
  monthlyPayment: number;
  loadPercent?: number;
  deltaVsSelected?: number | null;
  totalCost?: number | null;
  status?: AffordabilityScoreStatus;
  selected?: boolean;
  badge?: string;
};

type Props = {
  title: string;
  footnote?: string;
  rows: ScenarioComparisonRow[];
};

const statusTone: Record<
  AffordabilityScoreStatus,
  'success' | 'primary' | 'warning' | 'danger'
> = {
  comfortable: 'success',
  reasonable: 'primary',
  adjusted: 'warning',
  risky: 'danger',
};

export function ScenarioComparison({ title, footnote, rows }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.list}>
        {rows.map((row) => (
          <Card
            key={row.id}
            style={[styles.card, row.selected ? styles.selected : null]}
            accessibilityLabel={`${row.title}${row.selected ? ', plazo seleccionado' : ''}`}
          >
            <View style={styles.header}>
              <Text style={styles.term}>{row.title}</Text>
              {row.selected ? (
                <Text style={styles.selectedLabel}>Seleccionado</Text>
              ) : null}
              {row.badge ? <Text style={styles.badge}>{row.badge}</Text> : null}
            </View>
            <Text style={styles.payment}>{formatCLP(row.monthlyPayment)}</Text>
            {row.loadPercent != null ? (
              <Text style={styles.meta}>Carga: {formatPercent(row.loadPercent)}</Text>
            ) : null}
            {row.deltaVsSelected != null && !row.selected ? (
              <Text style={styles.meta}>
                {row.deltaVsSelected > 0 ? '+' : ''}
                {formatCLP(row.deltaVsSelected)} vs plazo elegido
              </Text>
            ) : null}
            {row.totalCost != null ? (
              <Text style={styles.meta}>Costo total aprox.: {formatCLP(row.totalCost)}</Text>
            ) : null}
            {row.status ? (
              <StatusBadge
                label={affordabilityScoreLabels[row.status]}
                tone={statusTone[row.status]}
                icon={row.status === 'comfortable' || row.status === 'reasonable' ? '✓' : '!'}
              />
            ) : null}
          </Card>
        ))}
      </View>
      {footnote ? <Text style={styles.footnote}>{footnote}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  list: {
    gap: spacing.sm,
  },
  card: {
    gap: spacing.xs,
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  term: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  selectedLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.mutedText,
  },
  payment: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    fontSize: 13,
    color: colors.mutedText,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.mutedText,
  },
});
