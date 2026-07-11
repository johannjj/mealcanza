import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';

type Props = {
  label: string;
  value: string;
  suffix?: string;
  caption?: string;
};

/** Número principal grande para pantallas de resultado. */
export function ResultHero({ label, value, suffix, caption }: Props) {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 38,
  },
  suffix: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
  },
  caption: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.85)',
  },
});
