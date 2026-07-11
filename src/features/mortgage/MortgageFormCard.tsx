import { Control, Controller, useWatch } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { CurrencyInput } from '@/components/forms/CurrencyInput';
import { FormField } from '@/components/forms/FormField';
import { FormSection } from '@/components/forms/FormSection';
import { PercentInput } from '@/components/forms/PercentInput';
import { TermYearsSelector } from '@/components/forms/TermYearsSelector';
import { UfInput } from '@/components/forms/UfInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mortgageCopy, simulatorCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { MortgageFormValues } from '@/utils/validations';
import { formatUF } from '@/utils/uf';

type Props = {
  control: Control<MortgageFormValues>;
  onSubmit: () => void;
  formError: string | null;
};

function getDownPaymentHelp(propertyValueUf: number): string {
  if (propertyValueUf > 0) {
    const twentyPercent = propertyValueUf * 0.2;
    return `20% del valor de una propiedad de ${formatUF(propertyValueUf)} ≈ ${formatUF(twentyPercent)}`;
  }
  return mortgageCopy.downPaymentHelpDefault;
}

export function MortgageFormCard({ control, onSubmit, formError }: Props) {
  const propertyValueUf = useWatch({ control, name: 'propertyValueUf' }) ?? 0;

  return (
    <Card>
      <View style={styles.form}>
        <FormSection emoji="🏠" title={mortgageCopy.sectionProperty}>
          <Controller
            control={control}
            name="propertyValueUf"
            render={({ field, fieldState }) => (
              <FormField
                question={mortgageCopy.propertyQuestion}
                label={mortgageCopy.propertyLabel}
                helpText={mortgageCopy.propertyHelp}
                error={fieldState.error?.message}
              >
                <UfInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={mortgageCopy.propertyPlaceholder}
                />
              </FormField>
            )}
          />
        </FormSection>

        <View style={styles.divider} />

        <FormSection emoji="💰" title={mortgageCopy.sectionDownPayment}>
          <Controller
            control={control}
            name="downPaymentUf"
            render={({ field, fieldState }) => (
              <FormField
                question={mortgageCopy.downPaymentQuestion}
                label={mortgageCopy.downPaymentLabel}
                helpText={getDownPaymentHelp(propertyValueUf)}
                error={fieldState.error?.message}
              >
                <UfInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={mortgageCopy.downPaymentPlaceholder}
                />
              </FormField>
            )}
          />
        </FormSection>

        <View style={styles.divider} />

        <FormSection emoji="📈" title={mortgageCopy.sectionCredit}>
          <Controller
            control={control}
            name="annualRatePercent"
            render={({ field, fieldState }) => (
              <FormField label={mortgageCopy.rateLabel} error={fieldState.error?.message}>
                <PercentInput value={field.value} onChange={field.onChange} />
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="termYears"
            render={({ field, fieldState }) => (
              <FormField label={mortgageCopy.termLabel} error={fieldState.error?.message}>
                <TermYearsSelector value={field.value} onChange={field.onChange} />
              </FormField>
            )}
          />
        </FormSection>

        <View style={styles.divider} />

        <FormSection emoji="👤" title={mortgageCopy.sectionFinancial}>
          <Controller
            control={control}
            name="netMonthlyIncome"
            render={({ field, fieldState }) => (
              <FormField label={mortgageCopy.incomeLabel} error={fieldState.error?.message}>
                <CurrencyInput value={field.value} onChange={field.onChange} />
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="otherMonthlyCredits"
            render={({ field, fieldState }) => (
              <FormField label={mortgageCopy.creditsLabel} error={fieldState.error?.message}>
                <CurrencyInput value={field.value} onChange={field.onChange} />
              </FormField>
            )}
          />
        </FormSection>
      </View>

      <Button label={simulatorCopy.mortgageSubmit} onPress={onSubmit} />
      {formError ? <Text style={styles.error}>{formError}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  error: {
    color: colors.danger,
    marginTop: spacing.sm,
    fontSize: 13,
  },
});
