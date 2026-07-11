import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { mortgageCopy } from '@/constants/copy';
import { colors, radius, spacing } from '@/theme';
import type { UfValue } from '@/types/uf';
import { formatCLP } from '@/utils/currency';
import { formatDateCL } from '@/utils/date';

type Props = {
  uf: UfValue | null;
  loading: boolean;
};

export function UfRateBanner({ uf, loading }: Props) {
  if (loading) {
    return (
      <View style={styles.banner}>
        <ActivityIndicator size="small" color={colors.secondary} />
        <Text style={styles.loadingText}>{mortgageCopy.ufLoading}</Text>
      </View>
    );
  }

  if (!uf) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.ufLine}>
        UF actual: {formatCLP(uf.value)} — actualizada al {formatDateCL(uf.date)}
      </Text>
      {uf.source === 'fallback' ? (
        <Text style={styles.warning}>{mortgageCopy.ufFallbackWarning}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  ufLine: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  warning: {
    fontSize: 12,
    color: colors.warning,
  },
  loadingText: {
    fontSize: 12,
    color: colors.mutedText,
  },
});
