import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, radius, spacing } from '@/theme';
import { formatCLP } from '@/utils/currency';

export type BreakdownSegment = {
  key: string;
  label: string;
  value: number;
  /** Patrón visual además del color (accesibilidad) */
  pattern: 'solid' | 'striped' | 'dotted';
};

type Props = {
  title?: string;
  totalLabel: string;
  totalValue: number;
  segments: BreakdownSegment[];
};

const patternColors: Record<BreakdownSegment['pattern'], string> = {
  solid: colors.primary,
  striped: colors.secondary,
  dotted: '#9CA3AF',
};

export function FinancialBreakdownBar({
  title = 'Desglose de tu renta',
  totalLabel,
  totalValue,
  segments,
}: Props) {
  const safeTotal = Math.max(totalValue, 0);
  const positive = segments.filter((s) => s.value > 0);
  const sum = positive.reduce((acc, s) => acc + s.value, 0);
  const widths =
    sum > 0
      ? positive.map((s) => Math.max(8, (s.value / sum) * 100))
      : positive.map(() => 33);

  const accessibilitySummary = [
    `${totalLabel}: ${formatCLP(safeTotal)}.`,
    ...segments.map((s) => `${s.label}: ${formatCLP(s.value)}.`),
  ].join(' ');

  return (
    <Card
      style={styles.card}
      accessibilityRole="summary"
      accessibilityLabel={accessibilitySummary}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.total}>
        {totalLabel}: {formatCLP(safeTotal)}
      </Text>
      <View style={styles.barTrack}>
        {positive.map((segment, index) => (
          <View
            key={segment.key}
            style={[
              styles.segment,
              {
                flexGrow: widths[index],
                backgroundColor: patternColors[segment.pattern],
                opacity: segment.pattern === 'dotted' ? 0.55 : 1,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.legend}>
        {segments.map((segment) => (
          <View key={segment.key} style={styles.legendRow}>
            <View
              style={[
                styles.swatch,
                { backgroundColor: patternColors[segment.pattern] },
                segment.pattern === 'dotted' && styles.swatchDotted,
              ]}
            />
            <Text style={styles.legendLabel}>{segment.label}</Text>
            <Text style={styles.legendValue}>{formatCLP(segment.value)}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  total: {
    fontSize: 14,
    color: colors.mutedText,
  },
  barTrack: {
    flexDirection: 'row',
    height: 16,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: colors.background,
    gap: 2,
  },
  segment: {
    height: '100%',
    minWidth: 4,
  },
  legend: {
    gap: spacing.sm,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  swatchDotted: {
    opacity: 0.55,
    borderWidth: 1,
    borderColor: colors.mutedText,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
});
