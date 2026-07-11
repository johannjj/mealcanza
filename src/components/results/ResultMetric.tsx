import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';

type Props = {
  label: string;
  value: string;
  hint?: string;
};

export function ResultMetric({ label, value, hint }: Props) {
  return (
    <View style={styles.wrap} accessibilityRole="text">
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 2,
    flex: 1,
    minWidth: 120,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.mutedText,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  hint: {
    fontSize: 12,
    color: colors.mutedText,
  },
});
