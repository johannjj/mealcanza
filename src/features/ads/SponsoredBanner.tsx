import { StyleSheet, Text, View } from 'react-native';
import { appConfig } from '@/constants/config';
import { colors, radius, spacing } from '@/theme';
import type { SponsorAd } from '@/types/ads';

type Props = {
  ad: SponsorAd;
};

export function SponsoredBanner({ ad }: Props) {
  if (!appConfig.adsEnabled) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Patrocinado</Text>
      <Text style={styles.title}>{ad.title}</Text>
      <Text style={styles.description}>{ad.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    fontSize: 11,
    color: colors.mutedText,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.mutedText,
    marginTop: spacing.xs,
  },
});
