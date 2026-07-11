import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { simulatorCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';

export type SummaryItem = {
  label: string;
  value: string;
};

type Props = {
  items: SummaryItem[];
  title?: string;
};

export function SimulationSummaryCard({ items, title = simulatorCopy.summaryTitle }: Props) {
  return (
    <Card>
      <Text style={styles.title}>{title}</Text>
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.mutedText,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    flexShrink: 1,
  },
});
