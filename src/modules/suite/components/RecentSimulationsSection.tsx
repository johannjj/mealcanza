import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { LocalHistoryCard } from '@/components/results/LocalHistoryCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { suiteCopy } from '@/constants/copy';
import {
  clearSimulationHistory,
  loadSimulationHistory,
  removeSimulationHistoryEntry,
} from '@/services/simulationHistoryService';
import {
  setAffordabilityDraft,
  setIncomeRequiredDraft,
  setMortgageDraft,
} from '@/services/simulationDraftStore';
import type { SimulationHistoryEntry } from '@/types/simulationHistory';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

export function RecentSimulationsSection() {
  const router = useRouter();
  const [entries, setEntries] = useState<SimulationHistoryEntry[]>([]);

  const refresh = useCallback(async () => {
    setEntries(await loadSimulationHistory());
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  if (entries.length === 0) return null;

  const openEntry = (entry: SimulationHistoryEntry) => {
    const p = entry.params;
    if (entry.type === 'mortgage') {
      setMortgageDraft({
        propertyValueUf: Number(p.propertyValueUf),
        downPaymentUf: Number(p.downPaymentUf),
        annualRatePercent: Number(p.annualRatePercent),
        termYears: Number(p.termYears),
        netMonthlyIncome: Number(p.netMonthlyIncome),
        otherMonthlyCredits: Number(p.otherMonthlyCredits),
      });
    } else if (entry.type === 'affordability') {
      setAffordabilityDraft({
        netSalary: Number(p.netSalary),
        monthlyCredits: Number(p.monthlyCredits),
      });
    } else if (entry.type === 'income-required') {
      setIncomeRequiredDraft({
        propertyValueUf: Number(p.propertyValueUf),
        downPaymentUf: Number(p.downPaymentUf),
        annualRatePercent: Number(p.annualRatePercent),
        termYears: Number(p.termYears),
        loadPercent: Number(p.loadPercent),
      });
    }
    router.push(entry.route);
  };

  const handleClear = () => {
    Alert.alert(
      'Borrar historial',
      'Se eliminarán todas las simulaciones guardadas en este dispositivo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: () => {
            void clearSimulationHistory().then(refresh);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.wrap}>
      <SectionHeader
        title={suiteCopy.recentSimulationsTitle}
        subtitle={suiteCopy.recentSimulationsPrivacy}
      />
      <View style={styles.list}>
        {entries.slice(0, 6).map((entry) => (
          <LocalHistoryCard
            key={entry.id}
            entry={entry}
            onOpen={() => openEntry(entry)}
            onDelete={() => {
              void removeSimulationHistoryEntry(entry.id).then(refresh);
            }}
          />
        ))}
      </View>
      <Pressable
        onPress={handleClear}
        style={styles.clearBtn}
        accessibilityRole="button"
        accessibilityLabel={suiteCopy.clearHistory}
      >
        <Text style={styles.clearText}>{suiteCopy.clearHistory}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    width: '100%',
  },
  list: {
    gap: spacing.sm,
  },
  clearBtn: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.danger,
  },
});
