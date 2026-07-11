import { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToolPageLayout } from '@/components/layout/ToolPageLayout';
import { CalculatorExplainer } from '@/components/results/CalculatorExplainer';
import { EditCalculationButton } from '@/components/results/EditCalculationButton';
import { RelatedCalculatorsSection } from '@/components/results/RelatedCalculatorsSection';
import { ShareResultButton } from '@/components/ui/ShareResultButton';
import { suiteCopy } from '@/constants/copy';
import { affordabilityFormDevDefaults } from '@/config/formDevDefaults';
import { colors, spacing } from '@/theme';
import type { AffordabilityResult } from '@/types/financial';
import { simulateAffordability } from '@/utils/affordabilityCalculations';
import { affordabilityFormSchema, type AffordabilityFormValues } from '@/utils/validations';
import { formatCLP } from '@/utils/currency';
import { services } from '@/services/container';
import { shareAffordabilityResult } from '@/services/shareResultService';
import { addSimulationHistoryEntry } from '@/services/simulationHistoryService';
import { consumeAffordabilityDraft } from '@/services/simulationDraftStore';
import { routes } from '@/navigation/routes';
import { AffordabilityFormCard } from './AffordabilityFormCard';
import { AffordabilityResultCard } from './AffordabilityResultCard';

const defaultValues: AffordabilityFormValues = { ...affordabilityFormDevDefaults };

type Phase = 'form' | 'result';

export function AffordabilityScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [phase, setPhase] = useState<Phase>('form');
  const [result, setResult] = useState<AffordabilityResult | null>(null);
  const [submittedValues, setSubmittedValues] = useState<AffordabilityFormValues | null>(null);
  const startedRef = useRef(false);

  const { control, handleSubmit, reset } = useForm<AffordabilityFormValues>({
    resolver: zodResolver(affordabilityFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const draft = consumeAffordabilityDraft();
    if (draft) {
      reset({ ...defaultValues, ...draft });
    }
  }, [reset]);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      void services.analyticsRepository.trackCalculatorStarted?.('affordability');
      void services.analyticsRepository.trackPageView?.('affordability');
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const simulation = simulateAffordability(data);
    Keyboard.dismiss();
    setSubmittedValues(data);
    setResult(simulation);
    setPhase('result');
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    await addSimulationHistoryEntry({
      type: 'affordability',
      primaryResultLabel: 'Margen mensual',
      primaryResultValue: formatCLP(simulation.availableMonthly),
      route: routes.affordability,
      params: { ...data },
    });

    await services.analyticsRepository.trackCalculatorCompleted?.('affordability');
    await services.analyticsRepository.track({
      name: 'simulation_completed',
      type: 'affordability',
    });
  });

  const handleEdit = () => {
    if (submittedValues) reset(submittedValues);
    setPhase('form');
  };

  const handleShare = async () => {
    const shared = await shareAffordabilityResult();
    if (shared) await services.analyticsRepository.trackResultShared?.('affordability');
  };

  const isResult = phase === 'result' && result && submittedValues;

  return (
    <ToolPageLayout scrollRef={scrollRef}>
      {phase === 'form' ? (
        <>
          <Text style={styles.title}>Capacidad de pago</Text>
          <Text style={styles.subtitle}>
            Evalúa cuánto podrías destinar mensualmente a un dividendo según tu renta.
          </Text>
        </>
      ) : null}

      {isResult ? (
        <View style={styles.resultWrap}>
          <AffordabilityResultCard result={result} values={submittedValues} />
          <ShareResultButton onPress={() => void handleShare()} />
          <EditCalculationButton label={suiteCopy.editData} onPress={handleEdit} />
          <RelatedCalculatorsSection
            from="affordability"
            draft={{
              netMonthlyIncome: submittedValues.netSalary,
              netSalary: submittedValues.netSalary,
              otherMonthlyCredits: submittedValues.monthlyCredits,
            }}
          />
        </View>
      ) : (
        <AffordabilityFormCard control={control} onSubmit={onSubmit} />
      )}

      <CalculatorExplainer
        title="Sobre esta calculadora"
        whatItCalculates="Estima un margen mensual y un dividendo máximo sugerido a partir de tu renta y cargas."
        dataUsed="Sueldo líquido, costo de vivienda actual, créditos, gastos fijos y cargas por dependientes."
        howToRead="El margen es lo que quedaría tras tus cargas. El dividendo sugerido usa una fracción prudente de ese margen."
        limitations="No reemplaza evaluación crediticia. No incluye todos los gastos reales del hogar."
      />
    </ToolPageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.mutedText,
    marginBottom: 4,
  },
  resultWrap: {
    gap: spacing.md,
  },
});
