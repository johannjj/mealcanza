import { StyleSheet, Text, View } from 'react-native';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { simulatorCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { TermComparisonRow } from '@/types/financial';
import { formatCLP, formatPercent } from '@/utils/currency';

type Props = {
  rows: TermComparisonRow[];
  selectedTermYears?: number;
};

export function MortgageCompareTermsCard({ rows, selectedTermYears }: Props) {
  if (rows.length === 0) return null;

  return (
    <Card>
      <Text style={styles.title}>{simulatorCopy.compareTermsTitle}</Text>
      {rows.map((row, index) => (
        <View
          key={row.termYears}
          style={[styles.row, index === rows.length - 1 && styles.rowLast]}
        >
          <View style={styles.rowHeader}>
            <Text style={[styles.term, row.termYears === selectedTermYears && styles.termActive]}>
              {row.termYears} años
            </Text>
            {row.termYears === selectedTermYears ? (
              <Text style={styles.selectedTag}>Tu plazo</Text>
            ) : null}
          </View>
          <View style={styles.rowMetrics}>
            <Text style={styles.payment}>{formatCLP(row.monthlyPayment)}</Text>
            <Text style={styles.load}>{formatPercent(row.financialLoadPercent)}</Text>
          </View>
          <Badge status={row.status} />
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  term: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.mutedText,
  },
  termActive: {
    color: colors.primary,
  },
  selectedTag: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  rowMetrics: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.md,
  },
  payment: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  load: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
});
