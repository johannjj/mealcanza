import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { CurrencyInput } from '@/components/forms/CurrencyInput';
import { FormField } from '@/components/forms/FormField';
import { IntegerInput } from '@/components/forms/IntegerInput';
import { PercentInput } from '@/components/forms/PercentInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { simulatorCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';
import type { RefinanceFormValues } from '@/utils/validations';

type Props = {
  control: Control<RefinanceFormValues>;
  onSubmit: () => void;
  formError: string | null;
};

export function RefinanceFormCard({ control, onSubmit, formError }: Props) {
  return (
    <Card>
      <View style={styles.form}>
        <Controller
          control={control}
          name="currentBalance"
          render={({ field, fieldState }) => (
            <FormField label="Saldo actual deuda (CLP)" error={fieldState.error?.message}>
              <CurrencyInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="currentMonthlyPayment"
          render={({ field, fieldState }) => (
            <FormField label="Dividendo actual (CLP)" error={fieldState.error?.message}>
              <CurrencyInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="currentRatePercent"
          render={({ field, fieldState }) => (
            <FormField label="Tasa actual (%)" error={fieldState.error?.message}>
              <PercentInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="newRatePercent"
          render={({ field, fieldState }) => (
            <FormField label="Nueva tasa estimada (%)" error={fieldState.error?.message}>
              <PercentInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="remainingTermYears"
          render={({ field, fieldState }) => (
            <FormField label="Plazo restante (años)" error={fieldState.error?.message}>
              <IntegerInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="refinanceCost"
          render={({ field, fieldState }) => (
            <FormField label="Costo estimado refinanciamiento (CLP)" error={fieldState.error?.message}>
              <CurrencyInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
      </View>
      <Button label={simulatorCopy.refinanceSubmit} onPress={onSubmit} />
      {formError ? <Text style={styles.error}>{formError}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
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
