import { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import {
  refinanceFaqs,
  refinanceRelatedLinks,
  refinanceExplainer,
} from '@/constants/calculatorSeoContent';
import { suiteCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
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

  const breadcrumbs = [
    { label: 'Inicio', href: routes.home },
    { label: 'Vivienda', href: routes.vivienda },
    { label: 'Refinanciar' },
  ];

  return (
    <>
      <PageSeo
        page={seoPages.refinance}
        breadcrumbs={breadcrumbs.map((b) => ({
          name: b.label,
          path: (b.href as string) ?? routes.refinance,
        }))}
        faqs={refinanceFaqs}
      />
      <ToolPageLayout scrollRef={scrollRef}>
        <Breadcrumbs items={breadcrumbs} />
        {phase === 'form' ? (
          <>
            <Heading level={1} style={styles.title}>
              Simulador de refinanciamiento hipotecario
            </Heading>
            <Text style={styles.subtitle}>
              Compara tu dividendo actual con una nueva tasa estimada, calcula el ahorro mensual
              y revisa en cuántos meses recuperarías el costo de refinanciar.
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
          title={refinanceExplainer.title}
          intro={refinanceExplainer.intro}
          sections={refinanceExplainer.sections}
          whatItCalculates={refinanceExplainer.whatItCalculates}
          dataUsed={refinanceExplainer.dataUsed}
          howToRead={refinanceExplainer.howToRead}
          limitations={refinanceExplainer.limitations}
          faqs={refinanceFaqs}
          relatedLinks={refinanceRelatedLinks}
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
    lineHeight: 22,
    color: colors.mutedText,
    marginBottom: 4,
  },
  resultWrap: {
    gap: spacing.md,
  },
});
