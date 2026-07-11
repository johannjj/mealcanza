import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { layout } from '@/theme/layout';
import { colors, radius, spacing } from '@/theme';

const QUICK_TERMS = [20, 25, 30] as const;
const EXTENDED_TERMS = [35, 40] as const;

type Props = {
  value: number;
  onChange: (years: number) => void;
};

export function TermYearsSelector({ value, onChange }: Props) {
  const [showMore, setShowMore] = useState(() =>
    (EXTENDED_TERMS as readonly number[]).includes(value),
  );

  const terms = showMore ? [...QUICK_TERMS, ...EXTENDED_TERMS] : [...QUICK_TERMS];

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {terms.map((years) => (
          <Pressable
            key={years}
            onPress={() => onChange(years)}
            style={[styles.chip, value === years && styles.chipActive]}
          >
            <Text style={[styles.chipText, value === years && styles.chipTextActive]}>
              {years} años
            </Text>
          </Pressable>
        ))}
      </View>
      {!showMore ? (
        <Pressable onPress={() => setShowMore(true)} style={styles.moreBtn}>
          <Text style={styles.moreText}>Más opciones</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    minHeight: layout.minTouchTarget,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
  },
  moreBtn: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
  },
  moreText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
});
