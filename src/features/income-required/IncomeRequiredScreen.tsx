import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToolPageLayout } from '@/components/layout/ToolPageLayout';
import { CalculatorExplainer } from '@/components/results/CalculatorExplainer';
import { EditCalculationButton } from '@/components/results/EditCalculationButton';
import { RelatedCalculatorsSection } from '@/components/results/RelatedCalculatorsSection';
import { ShareResultButton } from '@/components/ui/ShareResultButton';
import { UfRateBanner } from '@/features/mortgage/UfRateBanner';
import { incomeRequiredCopy, suiteCopy } from '@/constants/copy';
import { incomeRequiredFormDevDefaults } from '@/config/formDevDefaults';
import { colors, spacing } from '@/theme';
import type { IncomeRequiredAnalysis } from '@/utils/incomeRequiredCalculations';
import type { UfValue } from '@/types/uf';
import { buildIncomeRequiredAnalysis } from '@/utils/incomeRequiredCalculations';
import { incomeRequiredFormSchema, type IncomeRequiredFormValues } from '@/utils/validations';
import { formatCLP } from '@/utils/currency';
import { getCurrentUf } from '@/services/ufService';
import { services } from '@/services/container';
import { shareIncomeRequiredResult } from '@/services/shareResultService';
import { addSimulationHistoryEntry } from '@/services/simulationHistoryService';
import { consumeIncomeRequiredDraft } from '@/services/simulationDraftStore';
import { routes } from '@/navigation/routes';
import { IncomeRequiredFormCard } from './IncomeRequiredFormCard';
import { IncomeRequiredResultCard } from './IncomeRequiredResultCard';

const defaultValues: IncomeRequiredFormValues = { ...incomeRequiredFormDevDefaults };

type Phase = 'form' | 'result';

export function IncomeRequiredScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [phase, setPhase] = useState<Phase>('form');
  const [loadPercent, setLoadPercent] = useState(30);
  const [analysis, setAnalysis] = useState<IncomeRequiredAnalysis | null>(null);
  const [submittedValues, setSubmittedValues] = useState<IncomeRequiredFormValues | null>(
    null,
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [uf, setUf] = useState<UfValue | null>(null);
  const [ufLoading, setUfLoading] = useState(true);
  const startedRef = useRef(false);

  const { control, handleSubmit, reset } = useForm<IncomeRequiredFormValues>({
    resolver: zodResolver(incomeRequiredFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const draft = consumeIncomeRequiredDraft();
    if (draft) {
      reset({
        ...defaultValues,
        propertyValueUf: draft.propertyValueUf ?? defaultValues.propertyValueUf,
        downPaymentUf: draft.downPaymentUf ?? defaultValues.downPaymentUf,
        annualRatePercent: draft.annualRatePercent ?? defaultValues.annualRatePercent,
        termYears: draft.termYears ?? defaultValues.termYears,
      });
      if (draft.loadPercent) setLoadPercent(draft.loadPercent);
    }
  }, [reset]);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      void services.analyticsRepository.trackCalculatorStarted?.('income-required');
      void services.analyticsRepository.trackPageView?.('income-required');
    }
  }, []);

  const loadUf = useCallback(async () => {
    setUfLoading(true);
    try {
      setUf(await getCurrentUf());
    } finally {
      setUfLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUf();
  }, [loadUf]);

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    if (!uf || uf.value <= 0) {
      setFormError('No hay valor UF disponible. Revisa tu conexión e intenta de nuevo.');
      return;
    }

    const result = buildIncomeRequiredAnalysis({
      ...data,
      ufValue: uf.value,
      loadPercent,
    });

    if (!result) {
      setFormError('No fue posible calcular con los datos ingresados.');
      setAnalysis(null);
      return;
    }

    Keyboard.dismiss();
    setSubmittedValues(data);
    setAnalysis(result);
    setPhase('result');
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    await addSimulationHistoryEntry({
      type: 'income-required',
      primaryResultLabel: 'Renta necesaria',
      primaryResultValue: formatCLP(result.requiredIncome),
      ufValue: uf.value,
      route: routes.incomeRequired,
      params: { ...data, loadPercent },
    });

    await services.analyticsRepository.trackCalculatorCompleted?.('income-required');
    await services.analyticsRepository.track({
      name: 'simulation_completed',
      type: 'income-required',
    });
  });

  const handleEdit = () => {
    if (submittedValues) reset(submittedValues);
    setPhase('form');
    setFormError(null);
  };

  const handleShare = async () => {
    if (!analysis) return;
    const shared = await shareIncomeRequiredResult({
      requiredIncome: analysis.requiredIncome,
      propertyValueUf: analysis.propertyValueUf,
    });
    if (shared) await services.analyticsRepository.trackResultShared?.('income-required');
  };

  const isResult = phase === 'result' && analysis && submittedValues && uf;

  return (
    <ToolPageLayout scrollRef={scrollRef}>
      {phase === 'form' ? (
        <>
          <Text style={styles.title}>{incomeRequiredCopy.title}</Text>
          <Text style={styles.subtitle}>{incomeRequiredCopy.subtitle}</Text>
          <UfRateBanner uf={uf} loading={ufLoading} />
        </>
      ) : null}

      {isResult ? (
        <View style={styles.resultWrap}>
          <IncomeRequiredResultCard
            analysis={analysis}
            values={submittedValues}
            ufValue={uf.value}
            loadPercent={loadPercent}
          />
          <ShareResultButton onPress={() => void handleShare()} />
          <EditCalculationButton label={suiteCopy.editData} onPress={handleEdit} />
          <RelatedCalculatorsSection
            from="income-required"
            draft={{
              propertyValueUf: submittedValues.propertyValueUf,
              downPaymentUf: submittedValues.downPaymentUf,
              annualRatePercent: submittedValues.annualRatePercent,
              termYears: submittedValues.termYears,
              loadPercent,
              netMonthlyIncome: analysis.requiredIncome,
            }}
          />
        </View>
      ) : (
        <IncomeRequiredFormCard
          control={control}
          loadPercent={loadPercent}
          onLoadPercentChange={setLoadPercent}
          onSubmit={onSubmit}
          formError={formError}
        />
      )}

      <CalculatorExplainer
        title="Sobre esta calculadora"
        whatItCalculates="Estima la renta líquida necesaria para sostener un dividendo con un porcentaje de carga elegido."
        dataUsed="Propiedad, pie, tasa, plazo, UF y porcentaje máximo de carga financiera."
        howToRead="El número principal es la renta estimada. Compara 25%, 30% y 35% para ver escenarios más conservadores o ajustados."
        limitations="Es referencial. No garantiza aprobación ni incluye seguros u otros costos."
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
    color: colors.mutedText,
    lineHeight: 21,
    marginBottom: spacing.xs,
  },
  resultWrap: {
    gap: spacing.md,
  },
});
