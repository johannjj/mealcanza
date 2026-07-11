import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { CurrencyInput } from '@/components/forms/CurrencyInput';
import { FormField } from '@/components/forms/FormField';
import { IntegerInput } from '@/components/forms/IntegerInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { simulatorCopy } from '@/constants/copy';
import { spacing } from '@/theme';
import type { AffordabilityFormValues } from '@/utils/validations';

type Props = {
  control: Control<AffordabilityFormValues>;
  onSubmit: () => void;
};

export function AffordabilityFormCard({ control, onSubmit }: Props) {
  return (
    <Card>
      <View style={styles.form}>
        <Controller
          control={control}
          name="netSalary"
          render={({ field, fieldState }) => (
            <FormField label="Sueldo líquido (CLP)" error={fieldState.error?.message}>
              <CurrencyInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="currentHousingCost"
          render={({ field, fieldState }) => (
            <FormField label="Arriendo / dividendo actual (CLP)" error={fieldState.error?.message}>
              <CurrencyInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="monthlyCredits"
          render={({ field, fieldState }) => (
            <FormField label="Créditos mensuales (CLP)" error={fieldState.error?.message}>
              <CurrencyInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="fixedExpenses"
          render={({ field, fieldState }) => (
            <FormField label="Gastos fijos (CLP)" error={fieldState.error?.message}>
              <CurrencyInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="dependents"
          render={({ field, fieldState }) => (
            <FormField label="Número de cargas / hijos" error={fieldState.error?.message}>
              <IntegerInput value={field.value} onChange={field.onChange} />
            </FormField>
          )}
        />
      </View>
      <Button label={simulatorCopy.affordabilitySubmit} onPress={onSubmit} />
    </Card>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
});
