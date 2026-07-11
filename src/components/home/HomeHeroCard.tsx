import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { homeCopy, suiteCopy } from '@/constants/copy';
import { routes } from '@/navigation/routes';
import { colors, spacing } from '@/theme';

/** Copia legacy en components/home — preferir HeroSection del módulo suite. */
export function HomeHeroCard() {
  const router = useRouter();

  return (
    <Card style={styles.card}>
      <Text style={styles.brand}>{suiteCopy.appName}</Text>
      <Text style={styles.tagline}>{suiteCopy.tagline}</Text>
      <Text style={styles.title}>{homeCopy.heroTitle}</Text>
      <Text style={styles.subtitle}>{homeCopy.heroSubtitle}</Text>
      <View style={styles.actions}>
        <Button
          label={homeCopy.heroPrimaryCta}
          variant="light"
          onPress={() => router.push(routes.mortgage)}
          style={styles.cta}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  brand: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },
  actions: {
    marginTop: spacing.sm,
  },
  cta: {
    marginTop: spacing.sm,
  },
});
