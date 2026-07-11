import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { RelatedCalculatorCard } from '@/components/results/RelatedCalculatorCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getRelatedCalculators } from '@/constants/relatedCalculators';
import { suiteCopy } from '@/constants/copy';
import type { CalculatorAnalyticsType } from '@/repositories/AnalyticsRepository';
import { services } from '@/services/container';
import {
  setAffordabilityDraft,
  setIncomeRequiredDraft,
  setMortgageDraft,
  type MortgageDraft,
} from '@/services/simulationDraftStore';
import { spacing } from '@/theme';

type Props = {
  from: CalculatorAnalyticsType;
  /** Datos para precargar la calculadora destino cuando aplique */
  draft?: MortgageDraft & { netSalary?: number; loadPercent?: number };
};

export function RelatedCalculatorsSection({ from, draft }: Props) {
  const router = useRouter();
  const items = getRelatedCalculators(from);

  const openRelated = async (to: CalculatorAnalyticsType, route: string) => {
    if (draft) {
      if (to === 'mortgage') {
        setMortgageDraft({
          propertyValueUf: draft.propertyValueUf,
          downPaymentUf: draft.downPaymentUf,
          annualRatePercent: draft.annualRatePercent,
          termYears: draft.termYears,
          netMonthlyIncome: draft.netMonthlyIncome,
          otherMonthlyCredits: draft.otherMonthlyCredits,
        });
      }
      if (to === 'income-required') {
        setIncomeRequiredDraft({
          propertyValueUf: draft.propertyValueUf,
          downPaymentUf: draft.downPaymentUf,
          annualRatePercent: draft.annualRatePercent,
          termYears: draft.termYears,
          loadPercent: draft.loadPercent,
        });
      }
      if (to === 'affordability') {
        setAffordabilityDraft({
          netSalary: draft.netSalary ?? draft.netMonthlyIncome,
          monthlyCredits: draft.otherMonthlyCredits,
        });
      }
    }

    await services.analyticsRepository.trackRelatedCalculatorOpened?.(from, to);
    router.push(route as '/');
  };

  return (
    <View style={styles.wrap}>
      <SectionHeader title={suiteCopy.relatedSectionTitle} />
      <View style={styles.list}>
        {items.map((item) => (
          <RelatedCalculatorCard
            key={item.id}
            title={item.title}
            description={item.description}
            onPress={() => void openRelated(item.id, item.route)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  list: {
    gap: spacing.sm,
  },
});
