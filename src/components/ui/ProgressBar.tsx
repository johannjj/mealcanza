import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { formatPercent } from '@/utils/currency';

type Props = {
  percent: number;
  label?: string;
};

export function ProgressBar({ percent, label }: Props) {
  const clamped = Math.min(100, Math.max(0, percent));
  const barColor =
    clamped <= 25 ? colors.success : clamped <= 35 ? colors.warning : colors.danger;

  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.value}>{formatPercent(clamped)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: colors.mutedText,
    marginBottom: spacing.xs,
  },
  track: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.sm,
  },
  value: {
    fontSize: 12,
    color: colors.mutedText,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
});
