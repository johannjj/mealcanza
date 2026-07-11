import { StyleSheet, Text, View } from 'react-native';
import { financialLoadEmoji, financialLoadLabels } from '@/constants/copy';
import { colors, radius, spacing } from '@/theme';
import type { FinancialLoadStatus } from '@/types/financial';

const statusConfig: Record<
  FinancialLoadStatus,
  { label: string; emoji: string; bg: string; text: string }
> = {
  reasonable: {
    label: financialLoadLabels.reasonable,
    emoji: financialLoadEmoji.reasonable,
    bg: '#E8F5E9',
    text: colors.success,
  },
  adjusted: {
    label: financialLoadLabels.adjusted,
    emoji: financialLoadEmoji.adjusted,
    bg: '#FFF8E1',
    text: colors.warning,
  },
  risky: {
    label: financialLoadLabels.risky,
    emoji: financialLoadEmoji.risky,
    bg: '#FFEBEE',
    text: colors.danger,
  },
};

type Props = {
  status: FinancialLoadStatus;
};

export function Badge({ status }: Props) {
  const config = statusConfig[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={styles.emoji}>{config.emoji}</Text>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    gap: spacing.xs,
  },
  emoji: {
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
});
