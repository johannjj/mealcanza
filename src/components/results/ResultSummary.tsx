import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ResultMetric } from '@/components/results/ResultMetric';
import { colors, spacing } from '@/theme';

export type SummaryItem = {
  label: string;
  value: string;
  hint?: string;
};

type Props = {
  title?: string;
  items: SummaryItem[];
};

export function ResultSummary({ title = 'Resumen', items }: Props) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <ResultMetric
            key={`${item.label}-${item.value}`}
            label={item.label}
            value={item.value}
            hint={item.hint}
          />
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
    fontSize: 13,
    fontWeight: '700',
    color: colors.mutedText,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});
