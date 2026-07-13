import { ReactNode } from 'react';
import { Platform, StyleProp, Text, TextStyle } from 'react-native';

type Level = 1 | 2 | 3;

type Props = {
  level: Level;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
};

/**
 * Encabezado semántico en web (h1–h3). En nativo usa accessibilityRole + level.
 */
export function Heading({ level, children, style, accessibilityLabel }: Props) {
  const webProps =
    Platform.OS === 'web'
      ? ({
          accessibilityLevel: level,
          // RN Web maps these to real heading tags when role is header
        } as const)
      : {};

  return (
    <Text
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel}
      {...webProps}
      style={style}
    >
      {children}
    </Text>
  );
}
