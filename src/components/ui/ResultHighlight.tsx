import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';
import { formatCLP } from '@/utils/currency';

type Props = {
  label: string;
  value: number;
  isCurrency?: boolean;
};

export function ResultHighlight({ label, value, isCurrency = true }: Props) {
  const display = isCurrency ? formatCLP(value) : String(value);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.mutedText,
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.xs,
  },
});
