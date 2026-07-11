import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { appConfig } from '@/constants/config';
import { homeCopy, legalCopy } from '@/constants/copy';
import { colors, radius, spacing } from '@/theme';
import type { LeadObjective } from '@/types/lead';
import { leadFormSchema, type LeadFormValues } from '@/utils/validations';
import { services } from '@/services/container';

const objectives: { value: LeadObjective; label: string }[] = [
  { value: 'comprar', label: 'Comprar' },
  { value: 'refinanciar', label: 'Refinanciar' },
  { value: 'evaluar', label: 'Evaluar' },
];

export function LeadFormScreen() {
  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit, formState } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      commune: '',
      objective: 'comprar',
      comment: '',
      consent: undefined,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const anonymousUserId = await services.userRepository.getAnonymousUserId();
    await services.leadRepository.saveLead({
      anonymousUserId,
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      commune: data.commune,
      objective: data.objective,
      comment: data.comment,
      consent: data.consent,
    });
    await services.analyticsRepository.track({ name: 'lead_submitted' });
    setSubmitted(true);
    Alert.alert('Solicitud registrada', legalCopy.leadSuccessMessage);
  });

  if (submitted) {
    return (
      <ScreenLayout>
        <Card>
          <Text style={styles.successTitle}>¡Listo!</Text>
          <Text style={styles.successText}>{legalCopy.leadSuccessMessage}</Text>
          <Text style={styles.hint}>{legalCopy.noServerStorage}</Text>
        </Card>
      </ScreenLayout>
    );
  }

  const externalReady = Boolean(appConfig.orientationExternalUrl);

  return (
    <ScreenLayout>
      <Text style={styles.title}>Solicitar orientación</Text>
      <Text style={styles.subtitle}>
        {externalReady
          ? homeCopy.orientationSecondary
          : `${homeCopy.orientationSecondary} ${homeCopy.orientationSoon}.`}
      </Text>

      <Card>
        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <FormField label="Nombre" error={fieldState.error?.message}>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Tu nombre"
                  placeholderTextColor={colors.mutedText}
                />
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormField label="Email" error={fieldState.error?.message}>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="correo@ejemplo.cl"
                  placeholderTextColor={colors.mutedText}
                />
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormField label="Teléfono (opcional)" error={fieldState.error?.message}>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="phone-pad"
                  placeholder="+56 9 ..."
                  placeholderTextColor={colors.mutedText}
                />
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="commune"
            render={({ field, fieldState }) => (
              <FormField label="Comuna" error={fieldState.error?.message}>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Ej: Providencia"
                  placeholderTextColor={colors.mutedText}
                />
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="objective"
            render={({ field }) => (
              <FormField label="Objetivo">
                <View style={styles.chips}>
                  {objectives.map((item) => (
                    <Pressable
                      key={item.value}
                      style={[styles.chip, field.value === item.value && styles.chipActive]}
                      onPress={() => field.onChange(item.value)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          field.value === item.value && styles.chipTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="comment"
            render={({ field, fieldState }) => (
              <FormField label="Comentario (opcional)" error={fieldState.error?.message}>
                <TextInput
                  style={[styles.input, styles.multiline]}
                  value={field.value}
                  onChangeText={field.onChange}
                  multiline
                  numberOfLines={3}
                  placeholder="Cuéntanos tu situación"
                  placeholderTextColor={colors.mutedText}
                />
              </FormField>
            )}
          />
          <Controller
            control={control}
            name="consent"
            render={({ field, fieldState }) => (
              <FormField label="Consentimiento" error={fieldState.error?.message}>
                <Pressable style={styles.consentRow} onPress={() => field.onChange(!field.value)}>
                  <View style={[styles.checkbox, field.value && styles.checkboxChecked]} />
                  <Text style={styles.consentText}>{legalCopy.leadConsentLabel}</Text>
                </Pressable>
              </FormField>
            )}
          />
        </View>
        <Button label="Quiero orientación" onPress={onSubmit} disabled={formState.isSubmitting} />
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.mutedText,
    lineHeight: 20,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontSize: 14,
  },
  chipTextActive: {
    color: colors.white,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.success,
    marginBottom: spacing.sm,
  },
  successText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  hint: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.mutedText,
  },
});
