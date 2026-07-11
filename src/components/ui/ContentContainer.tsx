import { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { spacing } from '@/theme';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
};

/**
 * Contenedor centrado con ancho máximo en desktop.
 * Misma experiencia en móvil y web; solo adapta el espacio disponible.
 */
export function ContentContainer({ children, style, maxWidth }: Props) {
  const { maxContentWidth } = useResponsive();

  return (
    <View style={[styles.container, { maxWidth: maxWidth ?? maxContentWidth }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    gap: spacing.md,
  },
});
