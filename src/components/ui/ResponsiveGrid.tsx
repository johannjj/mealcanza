import { Children, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { spacing } from '@/theme';

type Props = {
  children: ReactNode;
  /** Máximo de columnas en tablet/desktop */
  maxColumns?: number;
  /** Columnas forzadas en desktop (≥1024). Por defecto = maxColumns. */
  desktopColumns?: number;
  style?: ViewStyle;
  gap?: number;
};

/**
 * Grilla responsive: 1 col móvil, 2 tablet, hasta N en desktop.
 * No oculta hijos: solo reorganiza el layout.
 */
export function ResponsiveGrid({
  children,
  maxColumns = 2,
  desktopColumns,
  style,
  gap = spacing.sm,
}: Props) {
  const { isMobile, isDesktop, width, minColumnWidth, maxContentWidth } = useResponsive();
  const items = Children.toArray(children);

  if (isMobile || items.length <= 1) {
    return <View style={[styles.stack, { gap }, style]}>{children}</View>;
  }

  const targetColumns = isDesktop ? (desktopColumns ?? maxColumns) : Math.min(2, maxColumns);
  const available = Math.min(width, maxContentWidth);
  const columns = Math.min(
    targetColumns,
    Math.max(2, Math.floor(available / minColumnWidth)),
    items.length,
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
    alignItems: 'stretch',
  },
  cell: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
  },
});
