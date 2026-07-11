import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/theme';

export const numericInputStyles = StyleSheet.create({
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
});
