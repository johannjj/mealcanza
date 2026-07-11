import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { useResponsive } from '@/hooks/useResponsive';

/** Ilustración abstracta vivienda/finanzas — sin fotos genéricas. */
export function HeroIllustration() {
  const { isMobile } = useResponsive();

  if (isMobile) return null;

  return (
    <View
      style={styles.canvas}
      accessibilityRole="image"
      accessibilityLabel="Ilustración de vivienda y cálculo financiero"
    >
      <View style={styles.house}>
        <View style={styles.roof} />
        <View style={styles.body}>
          <View style={styles.door} />
          <View style={styles.window} />
        </View>
      </View>
      <View style={styles.cardFloat}>
        <Text style={styles.cardLabel}>UF</Text>
        <View style={styles.barTall} />
        <View style={styles.barMid} />
        <View style={styles.barShort} />
      </View>
      <View style={styles.key}>
        <View style={styles.keyHead} />
        <View style={styles.keyShaft} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    minHeight: 260,
    backgroundColor: '#E8F1F4',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  house: {
    alignItems: 'center',
    zIndex: 1,
  },
  roof: {
    width: 0,
    height: 0,
    borderLeftWidth: 70,
    borderRightWidth: 70,
    borderBottomWidth: 48,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
  },
  body: {
    width: 120,
    height: 90,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomLeftRadius: radius.sm,
    borderBottomRightRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: spacing.sm,
  },
  door: {
    width: 28,
    height: 44,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  window: {
    width: 28,
    height: 28,
    backgroundColor: '#D6EAF0',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    marginBottom: spacing.md,
  },
  cardFloat: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
    width: 88,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: 4,
    alignItems: 'flex-start',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  barTall: {
    width: 48,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  barMid: {
    width: 36,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  barShort: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A8D5DE',
  },
  key: {
    position: 'absolute',
    left: spacing.lg,
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyHead: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  keyShaft: {
    width: 28,
    height: 4,
    backgroundColor: colors.secondary,
    marginLeft: -2,
    borderRadius: 2,
  },
});
