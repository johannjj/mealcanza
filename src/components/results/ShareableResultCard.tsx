import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { suiteCopy } from '@/constants/copy';

type Props = {
  calculationType: string;
  primaryLabel: string;
  primaryValue: string;
  statusLabel?: string;
  secondaryLabel?: string;
  secondaryValue?: string;
  domain?: string;
};

/**
 * Vista previa de tarjeta compartible (fase 1).
 * Captura a imagen documentada en docs/SHAREABLE_CARD.md.
 */
export function ShareableResultCard({
  calculationType,
  primaryLabel,
  primaryValue,
  statusLabel,
  secondaryLabel,
  secondaryValue,
  domain = '¿Me alcanza?',
}: Props) {
  return (
    <View
      style={styles.card}
      accessibilityRole="summary"
      accessibilityLabel={`Tarjeta para compartir: ${calculationType}, ${primaryValue}`}
    >
      <Text style={styles.brand}>{suiteCopy.appName}</Text>
      <Text style={styles.type}>{calculationType}</Text>
      <Text style={styles.primaryLabel}>{primaryLabel}</Text>
      <Text style={styles.primaryValue}>{primaryValue}</Text>
      {statusLabel ? <Text style={styles.status}>{statusLabel}</Text> : null}
      {secondaryLabel && secondaryValue ? (
        <Text style={styles.secondary}>
          {secondaryLabel}: {secondaryValue}
        </Text>
      ) : null}
      <Text style={styles.disclaimer}>Cálculo referencial · No es oferta de crédito</Text>
      <Text style={styles.domain}>{domain}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  brand: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
  },
  type: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: spacing.sm,
  },
  primaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  primaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  status: {
    marginTop: spacing.xs,
    fontSize: 14,
    fontWeight: '700',
    color: '#A8D5DE',
  },
  secondary: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
  disclaimer: {
    marginTop: spacing.md,
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
  },
  domain: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
});
