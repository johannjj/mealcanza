import { Platform, Pressable, StyleSheet, Text, View, type PressableStateCallbackType } from 'react-native';
import { layout } from '@/theme/layout';
import { colors, radius, spacing } from '@/theme';

type Props = {
  icon: string;
  label: string;
  description?: string;
  onPress: () => void;
};

function isHovered(state: PressableStateCallbackType): boolean {
  return Boolean((state as PressableStateCallbackType & { hovered?: boolean }).hovered);
}

export function ToolAccessButton({ icon, label, description, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={description ? `${label}. ${description}` : label}
      style={(state) => [
        styles.button,
        state.pressed && styles.pressed,
        Platform.OS === 'web' && isHovered(state) ? styles.hovered : null,
      ]}
    >
      <Text style={styles.icon} accessibilityElementsHidden>
        {icon}
      </Text>
      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Text style={styles.chevron} accessibilityElementsHidden>
        ›
      </Text>
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
  hovered: {
    borderColor: colors.secondary,
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
