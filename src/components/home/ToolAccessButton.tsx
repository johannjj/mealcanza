import { Pressable, StyleSheet, Text, View } from 'react-native';
import { layout } from '@/theme/layout';
import { colors, radius, spacing } from '@/theme';

type Props = {
  icon: string;
  label: string;
  description?: string;
  onPress: () => void;
};

export function ToolAccessButton({ icon, label, description, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: layout.minTouchTarget + 12,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  pressed: {
    opacity: 0.92,
  },
  icon: {
    fontSize: 24,
    width: 36,
    textAlign: 'center',
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  description: {
    fontSize: 13,
    color: colors.mutedText,
    lineHeight: 18,
  },
  chevron: {
    fontSize: 22,
    color: colors.mutedText,
    fontWeight: '300',
  },
});
