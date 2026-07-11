import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  Platform,
  type PressableStateCallbackType,
} from 'react-native';
import { layout } from '@/theme/layout';
import { colors, radius, spacing } from '@/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'light' | 'outlineOnDark';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

function isFocused(state: PressableStateCallbackType): boolean {
  return Boolean((state as PressableStateCallbackType & { focused?: boolean }).focused);
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  style,
  accessibilityLabel,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: Boolean(disabled) }}
      style={(state) => [
        styles.base,
        styles[variant],
        state.pressed && styles.pressed,
        disabled && styles.disabled,
        Platform.OS === 'web' && isFocused(state) ? styles.focused : null,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'outline' && styles.labelOutline,
          variant === 'light' && styles.labelLight,
          variant === 'outlineOnDark' && styles.labelOutlineOnDark,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.minTouchTarget,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  light: {
    backgroundColor: colors.white,
  },
  outlineOnDark: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  focused: {
    // @ts-expect-error outline válido en web
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineColor: colors.secondary,
    outlineOffset: 2,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  labelOutline: {
    color: colors.primary,
  },
  labelLight: {
    color: colors.primary,
  },
  labelOutlineOnDark: {
    color: colors.white,
  },
});
