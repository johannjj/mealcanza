import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { FormField } from '@/components/forms/FormField';
import { IntegerInput } from '@/components/forms/IntegerInput';
import { LoadPercentSelector } from '@/components/forms/LoadPercentSelector';
import { PercentInput } from '@/components/forms/PercentInput';
import { UfInput } from '@/components/forms/UfInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { incomeRequiredCopy, simulatorCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { IncomeRequiredFormValues } from '@/utils/validations';

type Props = {
  control: Control<IncomeRequiredFormValues>;
  loadPercent: number;
  onLoadPercentChange: (value: number) => void;
  onSubmit: () => void;
  formError: string | null;
};

export function IncomeRequiredFormCard({
  control,
  loadPercent,
  onLoadPercentChange,
  onSubmit,
  formError,
}: Props) {
  return (
    <Card>
      <Text style={styles.hint}>{incomeRequiredCopy.formHint}</Text>
      <View style={styles.form}>
        <Controller
          control={control}
          name="propertyValueUf"
          render={({ field, fieldState }) => (
            <FormField label="Valor propiedad (UF)" error={fieldState.error?.message}>
              <UfInput value={field.value} onChange={field.onChange} placeholder="Ej: 3500" />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="downPaymentUf"
          render={({ field, fieldState }) => (
            <FormField label="Pie (UF)" error={fieldState.error?.message}>
              <UfInput value={field.value} onChange={field.onChange} placeholder="Ej: 700" />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="annualRatePercent"
          render={({ field, fieldState }) => (
            <FormField label="Tasa anual (%)" error={fieldState.error?.message}>
              <PercentInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="termYears"
          render={({ field, fieldState }) => (
            <FormField label="Plazo (años)" error={fieldState.error?.message}>
              <IntegerInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <LoadPercentSelector value={loadPercent} onChange={onLoadPercentChange} />
      </View>
      <Button label={simulatorCopy.incomeRequiredSubmit} onPress={onSubmit} />
      {formError ? <Text style={styles.error}>{formError}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 14,
    color: colors.mutedText,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  error: {
    color: colors.danger,
    marginTop: spacing.sm,
    fontSize: 13,
  },
});
