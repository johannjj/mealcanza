import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToolPageLayout } from '@/components/layout/ToolPageLayout';
import { CalculatorExplainer } from '@/components/results/CalculatorExplainer';
import { EditCalculationButton } from '@/components/results/EditCalculationButton';
import { RelatedCalculatorsSection } from '@/components/results/RelatedCalculatorsSection';
import { ShareResultButton } from '@/components/ui/ShareResultButton';
import { mortgageCopy, suiteCopy } from '@/constants/copy';
import { appConfig } from '@/config/appConfig';
import { mortgageFormDevDefaults } from '@/config/formDevDefaults';
import { colors, spacing } from '@/theme';
import type { MortgageResult } from '@/types/financial';
import type { UfValue } from '@/types/uf';
import { calculateAffordabilityScore } from '@/utils/affordabilityScore';
import { compareMortgageTerms } from '@/utils/mortgageTermComparison';
import { simulateMortgage } from '@/utils/mortgageCalculations';
import { createMortgageFormSchema, type MortgageFormValues } from '@/utils/validations';
import { formatCLP } from '@/utils/currency';
import { getCurrentUf } from '@/services/ufService';
import { services } from '@/services/container';
import { shareMortgageResult } from '@/services/shareResultService';
import { addSimulationHistoryEntry } from '@/services/simulationHistoryService';
import { consumeMortgageDraft } from '@/services/simulationDraftStore';
import { routes } from '@/navigation/routes';
import { MortgageFormCard } from './MortgageFormCard';
import { MortgageResultCard } from './MortgageResultCard';
import { UfRateBanner } from './UfRateBanner';

const defaultValues: MortgageFormValues = { ...mortgageFormDevDefaults };

type Phase = 'form' | 'result';

export function MortgageSimulatorScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [phase, setPhase] = useState<Phase>('form');
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [submittedValues, setSubmittedValues] = useState<MortgageFormValues | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uf, setUf] = useState<UfValue | null>(null);
  const [ufLoading, setUfLoading] = useState(true);
  const startedRef = useRef(false);

  const ufForValidation = uf?.value ?? appConfig.fallbackUfValue;
  const formSchema = useMemo(
    () => createMortgageFormSchema(ufForValidation),
    [ufForValidation],
  );

  const { control, handleSubmit, reset } = useForm<MortgageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    const draft = consumeMortgageDraft();
    if (draft) {
      reset({
        ...defaultValues,
        ...draft,
      });
    }
  }, [reset]);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      void services.analyticsRepository.trackCalculatorStarted?.('mortgage');
      void services.analyticsRepository.trackPageView?.('mortgage');
    }
  }, []);

  const compareRows = useMemo(() => {
    if (!submittedValues || !uf) return [];
    return compareMortgageTerms({
      propertyValueUf: submittedValues.propertyValueUf,
      downPaymentUf: submittedValues.downPaymentUf,
      annualRatePercent: submittedValues.annualRatePercent,
      ufValue: uf.value,
      netMonthlyIncome: submittedValues.netMonthlyIncome,
      otherMonthlyCredits: submittedValues.otherMonthlyCredits,
    });
  }, [submittedValues, uf]);

  const score = useMemo(() => {
    if (!result || !submittedValues) return null;
    return calculateAffordabilityScore({
      netMonthlyIncome: submittedValues.netMonthlyIncome,
      monthlyDividend: result.monthlyPayment,
      otherMonthlyCredits: submittedValues.otherMonthlyCredits,
    });
  }, [result, submittedValues]);

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

    const simulation = simulateMortgage({
      propertyValueUf: data.propertyValueUf,
      downPaymentUf: data.downPaymentUf,
      ufValue: uf.value,
      annualRatePercent: data.annualRatePercent,
      termYears: data.termYears,
      netMonthlyIncome: data.netMonthlyIncome,
      otherMonthlyCredits: data.otherMonthlyCredits,
    });

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

    const scoreResult = calculateAffordabilityScore({
      netMonthlyIncome: data.netMonthlyIncome,
      monthlyDividend: simulation.monthlyPayment,
      otherMonthlyCredits: data.otherMonthlyCredits,
    });

    await addSimulationHistoryEntry({
      type: 'mortgage',
      primaryResultLabel: 'Dividendo',
      primaryResultValue: formatCLP(simulation.monthlyPayment),
      statusLabel: scoreResult?.label,
      status: scoreResult?.status,
      ufValue: uf.value,
      formulaVersion: scoreResult?.formulaVersion,
      route: routes.mortgage,
      params: {
        propertyValueUf: data.propertyValueUf,
        downPaymentUf: data.downPaymentUf,
        annualRatePercent: data.annualRatePercent,
        termYears: data.termYears,
        netMonthlyIncome: data.netMonthlyIncome,
        otherMonthlyCredits: data.otherMonthlyCredits,
      },
    });

    await services.analyticsRepository.trackCalculatorCompleted?.('mortgage');
    await services.analyticsRepository.track({
      name: 'simulation_completed',
      type: 'mortgage',
    });
  });

  const handleEditSimulation = () => {
    if (submittedValues) {
      reset(submittedValues);
    }
    setPhase('form');
    setFormError(null);
  };

  const handleShare = async () => {
    if (!result) return;
    const shared = await shareMortgageResult({
      monthlyPayment: result.monthlyPayment,
      propertyValueUf: result.propertyValueUf,
    });
    if (shared) {
      await services.analyticsRepository.trackResultShared?.('mortgage');
    }
  };

  const isResult = phase === 'result' && result && submittedValues && uf && score;

  return (
    <ToolPageLayout scrollRef={scrollRef}>
      {phase === 'form' ? (
        <>
          <Text style={styles.title}>{mortgageCopy.screenTitle}</Text>
          <Text style={styles.subtitle}>{mortgageCopy.screenSubtitle}</Text>
        </>
      ) : null}

      {phase === 'form' ? <UfRateBanner uf={uf} loading={ufLoading} /> : null}

      {isResult ? (
        <View style={styles.resultWrap}>
          <MortgageResultCard
            result={result}
            values={submittedValues}
            ufValue={uf.value}
            ufDate={uf.date}
            compareRows={compareRows}
            score={score}
          />
          <ShareResultButton onPress={() => void handleShare()} />
          <EditCalculationButton
            label={suiteCopy.editData}
            onPress={handleEditSimulation}
          />
          <RelatedCalculatorsSection
            from="mortgage"
            draft={{
              propertyValueUf: submittedValues.propertyValueUf,
              downPaymentUf: submittedValues.downPaymentUf,
              annualRatePercent: submittedValues.annualRatePercent,
              termYears: submittedValues.termYears,
              netMonthlyIncome: submittedValues.netMonthlyIncome,
              otherMonthlyCredits: submittedValues.otherMonthlyCredits,
              netSalary: submittedValues.netMonthlyIncome,
            }}
          />
        </View>
      ) : (
        <MortgageFormCard control={control} onSubmit={onSubmit} formError={formError} />
      )}

      <CalculatorExplainer
        title="Sobre este simulador"
        whatItCalculates="Estima un dividendo hipotecario referencial con sistema francés, usando valor de propiedad, pie, tasa, plazo y UF."
        dataUsed="Propiedad y pie en UF, tasa anual, plazo, renta líquida, otros créditos mensuales y UF del día (o valor de respaldo)."
        howToRead="El número principal es el dividendo estimado. El Índice ¿Me alcanza? resume el equilibrio mensual de forma referencial. Compara plazos para ver el trade-off entre cuota y costo total."
        limitations="No incluye seguros, gastos operacionales ni políticas de un banco. No garantiza aprobación crediticia."
        faqs={[
          {
            question: '¿La UF afecta mi dividendo en pesos?',
            answer:
              'Sí. Si el crédito está en UF, el valor en pesos puede cambiar cuando varía la UF.',
          },
          {
            question: '¿Qué significa el Índice ¿Me alcanza??',
            answer:
              'Es un indicador propio de equilibrio mensual. No es una evaluación bancaria.',
          },
        ]}
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
    marginBottom: 4,
  },
  resultWrap: {
    gap: spacing.md,
  },
});
