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
import { refinanceFormDevDefaults } from '@/config/formDevDefaults';
import { colors, spacing } from '@/theme';
import type { RefinanceResult } from '@/types/financial';
import { simulateRefinance } from '@/utils/refinanceCalculations';
import { refinanceFormSchema, type RefinanceFormValues } from '@/utils/validations';
import { formatCLP } from '@/utils/currency';
import { services } from '@/services/container';
import { shareRefinanceResult } from '@/services/shareResultService';
import { addSimulationHistoryEntry } from '@/services/simulationHistoryService';
import { routes } from '@/navigation/routes';
import { RefinanceFormCard } from './RefinanceFormCard';
import { RefinanceResultCard } from './RefinanceResultCard';

const defaultValues: RefinanceFormValues = { ...refinanceFormDevDefaults };

type Phase = 'form' | 'result';

export function RefinanceSimulatorScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [phase, setPhase] = useState<Phase>('form');
  const [result, setResult] = useState<RefinanceResult | null>(null);
  const [submittedValues, setSubmittedValues] = useState<RefinanceFormValues | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const { control, handleSubmit, reset } = useForm<RefinanceFormValues>({
    resolver: zodResolver(refinanceFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      void services.analyticsRepository.trackCalculatorStarted?.('refinance');
      void services.analyticsRepository.trackPageView?.('refinance');
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    const simulation = simulateRefinance(data);
    if (!simulation) {
      setFormError('No fue posible calcular con los datos ingresados.');
      setResult(null);
      return;
    }

    Keyboard.dismiss();
    setSubmittedValues(data);
    setResult(simulation);
    setPhase('result');
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    await addSimulationHistoryEntry({
      type: 'refinance',
      primaryResultLabel: 'Ahorro mensual',
      primaryResultValue: formatCLP(simulation.monthlySavings),
      route: routes.refinance,
      params: { ...data },
    });

    await services.analyticsRepository.trackCalculatorCompleted?.('refinance');
    await services.analyticsRepository.track({
      name: 'simulation_completed',
      type: 'refinance',
    });
  });

  const handleEdit = () => {
    if (submittedValues) reset(submittedValues);
    setPhase('form');
    setFormError(null);
  };

  const handleShare = async () => {
    if (!result) return;
    const shared = await shareRefinanceResult({ monthlySavings: result.monthlySavings });
    if (shared) await services.analyticsRepository.trackResultShared?.('refinance');
  };

  const isResult = phase === 'result' && result && submittedValues;

  return (
    <ToolPageLayout scrollRef={scrollRef}>
      {phase === 'form' ? (
        <>
          <Text style={styles.title}>Simulador de refinanciamiento</Text>
          <Text style={styles.subtitle}>
            Compara tu crédito actual con una nueva tasa estimada y mira el ahorro potencial.
          </Text>
        </>
      ) : null}

      {isResult ? (
        <View style={styles.resultWrap}>
          <RefinanceResultCard result={result} values={submittedValues} />
          <ShareResultButton onPress={() => void handleShare()} />
          <EditCalculationButton label={suiteCopy.editData} onPress={handleEdit} />
          <RelatedCalculatorsSection from="refinance" />
        </View>
      ) : (
        <RefinanceFormCard control={control} onSubmit={onSubmit} formError={formError} />
      )}

      <CalculatorExplainer
        title="Sobre este simulador"
        whatItCalculates="Estima el nuevo dividendo y el ahorro mensual si refinanciaras con otra tasa."
        dataUsed="Saldo, dividendo actual, tasas, plazo restante y costo estimado de refinanciar."
        howToRead="El dato principal es el ahorro mensual. Revisa en cuántos meses recuperarías el costo."
        limitations="No incluye todos los costos bancarios reales ni garantiza condiciones de refinanciamiento."
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
