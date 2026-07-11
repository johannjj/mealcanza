import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { HeroIllustration } from '@/modules/suite/components/HeroIllustration';
import { homeCopy } from '@/constants/copy';
import { useResponsive } from '@/hooks/useResponsive';
import { routes } from '@/navigation/routes';
import { colors, radius, spacing } from '@/theme';

export function HeroSection() {
  const router = useRouter();
  const { isDesktop } = useResponsive();

  return (
    <View style={[styles.wrap, isDesktop && styles.wrapDesktop]}>
      <View style={[styles.copy, isDesktop && styles.copyDesktop]}>
        <Text style={styles.title} accessibilityRole="header">
          {homeCopy.heroTitle}
        </Text>
        <Text style={styles.subtitle}>{homeCopy.heroSubtitle}</Text>
        <View style={styles.actions}>
          <Button
            label={homeCopy.heroPrimaryCta}
            onPress={() => router.push(routes.mortgage)}
            style={styles.ctaFull}
          />
          <Button
            label={homeCopy.heroSecondaryCta}
            variant="outline"
            onPress={() => router.push(routes.incomeRequired)}
            style={styles.ctaFull}
          />
        </View>
        <Text style={styles.trustLine}>{homeCopy.heroTrustLine}</Text>
      </View>
      {isDesktop ? (
        <View style={styles.visual}>
          <HeroIllustration />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  wrapDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
  },
  copy: {
    gap: spacing.md,
    flex: 1,
  },
  copyDesktop: {
    maxWidth: 520,
    paddingRight: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: colors.mutedText,
    lineHeight: 24,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  ctaFull: {
    width: '100%',
  },
  trustLine: {
    fontSize: 13,
    color: colors.mutedText,
    lineHeight: 18,
  },
  visual: {
    flex: 1,
    minWidth: 240,
  },
});
