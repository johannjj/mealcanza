import { StyleSheet, Text, View } from 'react-native';
import { appConfig } from '@/constants/config';
import { colors, radius, spacing } from '@/theme';

export function BottomSponsorSlot() {
  if (appConfig.adsEnabled) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Banner inferior patrocinado — próximamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.mutedText,
  },
});
