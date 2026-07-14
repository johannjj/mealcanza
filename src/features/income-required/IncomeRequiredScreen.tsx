import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToolPageLayout } from '@/components/layout/ToolPageLayout';
import { CalculatorExplainer } from '@/components/results/CalculatorExplainer';
import { EditCalculationButton } from '@/components/results/EditCalculationButton';
import { RelatedCalculatorsSection } from '@/components/results/RelatedCalculatorsSection';
import { PageSeo } from '@/components/seo/PageSeo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Heading } from '@/components/ui/Heading';
import { ShareResultButton } from '@/components/ui/ShareResultButton';
import { UfRateBanner } from '@/features/mortgage/UfRateBanner';
import {
  incomeRequiredFaqs,
  incomeRelatedLinks,
  incomeRequiredExplainer,
} from '@/constants/calculatorSeoContent';
import { suiteCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
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
    if (shared) {
      await services.analyticsRepository.trackResultShared?.(
        'income-required',
        Platform.OS === 'web' ? 'web' : 'native',
      );
    }
  };

  const isResult = phase === 'result' && analysis && submittedValues && uf;

  const breadcrumbs = [
    { label: 'Inicio', href: routes.home },
    { label: 'Vivienda', href: routes.vivienda },
    { label: '¿Cuánto debería ganar?' },
  ];

  return (
    <>
      <PageSeo
        page={seoPages.incomeRequired}
        breadcrumbs={breadcrumbs.map((b) => ({
          name: b.label,
          path: (b.href as string) ?? routes.incomeRequired,
        }))}
        faqs={incomeRequiredFaqs}
      />
      <ToolPageLayout scrollRef={scrollRef}>
        <Breadcrumbs items={breadcrumbs} />
        {phase === 'form' ? (
          <>
            <Heading level={1} style={styles.title}>
              ¿Cuánto debo ganar para comprar una propiedad?
            </Heading>
            <Text style={styles.subtitle}>
              Estima la renta líquida necesaria para sostener el dividendo de una propiedad según
              su valor en UF, pie, tasa, plazo y el porcentaje de carga que elijas.
            </Text>
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
          title={incomeRequiredExplainer.title}
          intro={incomeRequiredExplainer.intro}
          sections={incomeRequiredExplainer.sections}
          whatItCalculates={incomeRequiredExplainer.whatItCalculates}
          dataUsed={incomeRequiredExplainer.dataUsed}
          howToRead={incomeRequiredExplainer.howToRead}
          limitations={incomeRequiredExplainer.limitations}
          faqs={incomeRequiredFaqs}
          relatedLinks={incomeRelatedLinks}
        />
      </ToolPageLayout>
    </>
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
