import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';

type Props = {
  emoji: string;
  title: string;
  children: ReactNode;
};

export function FormSection({ emoji, title, children }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        {emoji} {title}
      </Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  body: {
    gap: spacing.md,
  },
});
