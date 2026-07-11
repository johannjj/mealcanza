import { Pressable, StyleSheet, Text, View } from 'react-native';
import { incomeRequiredCopy } from '@/constants/copy';
import { layout } from '@/theme/layout';
import { colors, radius, spacing } from '@/theme';

const OPTIONS = [25, 30, 35] as const;

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function LoadPercentSelector({ value, onChange }: Props) {
  return (
    <View>
      <Text style={styles.label}>{incomeRequiredCopy.loadLabel}</Text>
      <View style={styles.row}>
        {OPTIONS.map((option) => (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[styles.chip, value === option && styles.chipActive]}
          >
            <Text style={[styles.chipText, value === option && styles.chipTextActive]}>
              {option}%
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
  },
});
