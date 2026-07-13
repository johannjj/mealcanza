import { StyleSheet, Text, View } from 'react-native';
import { Heading } from '@/components/ui/Heading';
import { colors, spacing } from '@/theme';

type Props = {
  title: string;
  subtitle?: string;
  /** Ancla HTML-like para web (id nativo). */
  accessibilityLabel?: string;
};

export function SectionHeader({ title, subtitle, accessibilityLabel }: Props) {
  return (
    <View style={styles.wrap} accessibilityLabel={accessibilityLabel ?? title}>
      <Heading level={2} style={styles.title}>
        {title}
      </Heading>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    lineHeight: 22,
  },
});
