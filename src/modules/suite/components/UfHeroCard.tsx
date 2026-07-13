import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { appConfig } from '@/config/appConfig';
import { homeCopy, mortgageCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { UfValue } from '@/types/uf';
import { formatCLP } from '@/utils/currency';
import { formatDateCL } from '@/utils/date';
import { getCurrentUf } from '@/services/ufService';

function isSameCalendarDay(isoDate: string): boolean {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function UfHeroCard() {
  const [uf, setUf] = useState<UfValue | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setUf(await getCurrentUf());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const isFallback = uf?.source === 'fallback';
  const updatedToday = uf ? isSameCalendarDay(uf.date) : false;

  return (
    <Card style={styles.card}>
      {loading ? (
        <View style={styles.loading}>
          <View style={styles.placeholder}>
            <Text style={styles.ufLabel}>{homeCopy.heroUfLabel}</Text>
            <Text style={[styles.ufValue, styles.placeholderValue]}>
              {formatCLP(appConfig.fallbackUfValue)}
            </Text>
            <Text style={styles.meta}>{mortgageCopy.ufLoading}</Text>
          </View>
          <ActivityIndicator color={colors.secondary} />
        </View>
      ) : (
        <View style={styles.row}>
          <View style={styles.main}>
            <Text style={styles.ufLabel}>{homeCopy.heroUfLabel}</Text>
            <Text style={styles.ufValue} accessibilityRole="text">
              {uf ? formatCLP(uf.value) : '—'}
            </Text>
            <Text style={styles.meta}>
              {updatedToday && !isFallback
                ? homeCopy.heroUpdatedToday
                : `${homeCopy.heroUpdated}: ${uf ? formatDateCL(uf.date) : '—'}`}
            </Text>
            <Text style={styles.meta}>{homeCopy.heroSource}</Text>
          </View>
          <StatusBadge
            label={isFallback ? homeCopy.heroReferential : homeCopy.heroUpdated}
            tone={isFallback ? 'warning' : 'success'}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.md,
    minHeight: 88,
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    minHeight: 72,
  },
  placeholder: {
    flex: 1,
    gap: 2,
    opacity: 0.55,
  },
  placeholderValue: {
    color: colors.mutedText,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    minHeight: 72,
  },
  main: {
    flex: 1,
    gap: 2,
  },
  ufLabel: {
    fontSize: 12,
    color: colors.mutedText,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  ufValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: colors.mutedText,
    marginTop: 2,
  },
});
