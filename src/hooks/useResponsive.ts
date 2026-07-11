import { useWindowDimensions } from 'react-native';
import { getResponsiveFlags, layout } from '@/theme/layout';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const flags = getResponsiveFlags(width);

  return {
    width,
    height,
    ...flags,
    maxContentWidth: layout.maxContentWidth,
    formMaxWidth: layout.formMaxWidth,
    minColumnWidth: layout.minColumnWidth,
    minTouchTarget: layout.minTouchTarget,
  };
}
