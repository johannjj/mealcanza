import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';

type Props = {
  /** Altura mínima del canvas (móvil puede ser más baja). */
  minHeight?: number;
};

/**
 * Ilustración 404: casa inclinada / “descuadrada” — misma familia visual del Home.
 */
export function NotFoundIllustration({ minHeight = 220 }: Props) {
  return (
    <View
      style={[styles.canvas, { minHeight }]}
      accessibilityRole="image"
      accessibilityLabel="Ilustración: página no encontrada"
    >
      {/* Casa inclinada para indicar que algo anda mal */}
      <View style={styles.houseTilt}>
        <View style={styles.roof} />
        <View style={styles.body}>
          <View style={styles.door} />
          {/* Ventana “rota” / descentrada */}
          <View style={styles.windowBroken}>
            <View style={styles.windowCrack} />
          </View>
        </View>
        {/* Chimenea torcida */}
        <View style={styles.chimney} />
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeCode}>404</Text>
        <Text style={styles.badgeHint}>oops</Text>
        <View style={styles.barTall} />
        <View style={styles.barMid} />
        <View style={styles.barShort} />
      </View>

      {/* Llave caída / desalineada */}
      <View style={styles.keyFallen}>
        <View style={styles.keyHead} />
        <View style={styles.keyShaft} />
      </View>

      {/* Pequeña “marca de pregunta” flotante */}
      <View style={styles.questionMark} accessibilityElementsHidden>
        <Text style={styles.questionText}>?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    backgroundColor: '#E8F1F4',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  houseTilt: {
    alignItems: 'center',
    zIndex: 1,
    transform: [{ rotate: '-12deg' }, { translateY: 6 }],
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
    transform: [{ rotate: '4deg' }],
  },
  windowBroken: {
    width: 28,
    height: 28,
    backgroundColor: '#D6EAF0',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    marginBottom: spacing.md,
    transform: [{ rotate: '-8deg' }, { translateX: 4 }],
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  windowCrack: {
    position: 'absolute',
    width: 2,
    height: 30,
    backgroundColor: colors.primary,
    opacity: 0.45,
    transform: [{ rotate: '28deg' }],
  },
  chimney: {
    position: 'absolute',
    right: 28,
    top: 8,
    width: 18,
    height: 28,
    backgroundColor: colors.secondary,
    borderRadius: 2,
    transform: [{ rotate: '18deg' }],
    opacity: 0.85,
  },
  badge: {
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
    transform: [{ rotate: '6deg' }],
  },
  badgeCode: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  badgeHint: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.mutedText,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  barTall: {
    width: 48,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    transform: [{ rotate: '-4deg' }],
  },
  barMid: {
    width: 36,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    transform: [{ rotate: '3deg' }],
  },
  barShort: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A8D5DE',
    transform: [{ rotate: '-2deg' }],
  },
  keyFallen: {
    position: 'absolute',
    left: spacing.lg + 8,
    bottom: spacing.lg + 4,
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{ rotate: '-35deg' }],
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
  questionMark: {
    position: 'absolute',
    left: '42%',
    top: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '12deg' }],
  },
  questionText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.secondary,
  },
});
