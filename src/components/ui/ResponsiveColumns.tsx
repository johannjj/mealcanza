import { Children, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { spacing } from '@/theme';

type Props = {
  children: ReactNode;
  /** Máximo de columnas en tablet/desktop (por defecto 2) */
  maxColumns?: number;
  style?: ViewStyle;
  gap?: number;
};

/**
 * Apila en 1 columna en móvil; hasta 2 columnas en pantallas más anchas.
 * No oculta hijos: solo reorganiza el layout.
 */
export function ResponsiveColumns({
  children,
  maxColumns = 2,
  style,
  gap = spacing.sm,
}: Props) {
  const { isMobile, width, minColumnWidth, maxContentWidth } = useResponsive();
  const items = Children.toArray(children);

  if (isMobile || items.length <= 1) {
    return <View style={[styles.stack, { gap }, style]}>{children}</View>;
  }

  const available = Math.min(width, maxContentWidth);
  const columns = Math.min(
    maxColumns,
    Math.max(2, Math.floor(available / minColumnWidth)),
  );
  const basisPercent = 100 / columns - 1;

  return (
    <View style={[styles.row, { gap }, style]}>
      {items.map((child, index) => (
        <View
          key={index}
          style={[styles.cell, { flexBasis: `${basisPercent}%`, minWidth: minColumnWidth }]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  cell: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
