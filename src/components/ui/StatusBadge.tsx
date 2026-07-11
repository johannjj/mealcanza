import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';

type Tone = 'success' | 'warning' | 'neutral' | 'primary' | 'danger';

type Props = {
  label: string;
  tone?: Tone;
  icon?: string;
};

const toneStyles: Record<Tone, { bg: string; text: string }> = {
  success: { bg: '#E8F5E9', text: colors.success },
  warning: { bg: '#FFF8E1', text: '#B45309' },
  neutral: { bg: colors.background, text: colors.mutedText },
  primary: { bg: '#E6F0F3', text: colors.primary },
  danger: { bg: '#FFEBEE', text: colors.danger },
};

export function StatusBadge({ label, tone = 'primary', icon }: Props) {
  const palette = toneStyles[tone];
  return (
    <View
      style={[styles.badge, { backgroundColor: palette.bg }]}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      {icon ? (
        <Text style={[styles.icon, { color: palette.text }]} accessibilityElementsHidden>
          {icon}
        </Text>
      ) : null}
      <Text style={[styles.text, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  icon: {
    fontSize: 12,
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
