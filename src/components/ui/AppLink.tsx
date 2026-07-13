import { ReactNode } from 'react';
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { Link, type Href } from 'expo-router';

type Props = {
  href: Href;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  onPress?: () => void;
};

/**
 * Enlace real (`<a href>`) en web vía Expo Router Link; navegación nativa en Android/iOS.
 */
export function AppLink({
  href,
  children,
  style,
  textStyle,
  accessibilityLabel,
  onPress,
}: Props) {
  return (
    <Link href={href} asChild>
      <Pressable
        style={style}
        accessibilityRole="link"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
      >
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    </Link>
  );
}
