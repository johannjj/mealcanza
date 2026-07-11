import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';

type Props = {
  label: string;
  question?: string;
  helpText?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, question, helpText, error, children }: Props) {
  return (
    <View style={styles.field}>
      {question ? <Text style={styles.question}>{question}</Text> : null}
      <Text style={styles.label}>{label}</Text>
      {children}
      {helpText ? <Text style={styles.help}>{helpText}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.mutedText,
  },
  help: {
    fontSize: 13,
    color: colors.mutedText,
    lineHeight: 18,
  },
  error: {
    fontSize: 12,
    color: colors.danger,
  },
});
