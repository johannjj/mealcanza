import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { useResponsive } from '@/hooks/useResponsive';

const heroLogo = require('../../../../assets/brand/mealcanza.png');

/**
 * Hero visual: fondo azul claro + logo central + acentos UF y lupa
 * (misma composición que la ilustración original de la casa).
 */
export function HeroIllustration() {
  const { isMobile } = useResponsive();

  if (isMobile) return null;

  return (
    <View
      style={styles.canvas}
      accessibilityRole="image"
      accessibilityLabel="Logo ¿Me alcanza?"
    >
      <View style={styles.logoClip}>
        <Image
          source={heroLogo}
          style={styles.logo}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      </View>

      <View style={styles.cardFloat} accessibilityElementsHidden>
        <Text style={styles.cardLabel}>UF</Text>
        <View style={styles.barTall} />
        <View style={styles.barMid} />
        <View style={styles.barShort} />
      </View>

      <View style={styles.key} accessibilityElementsHidden>
        <View style={styles.keyHead} />
        <View style={styles.keyShaft} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    minHeight: 280,
    backgroundColor: '#E8F1F4',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    padding: spacing.lg,
  },
  logoClip: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  logo: {
    width: 200,
    height: 200,
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
    zIndex: 2,
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
    zIndex: 2,
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
