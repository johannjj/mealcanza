import { StyleSheet, Text, View } from 'react-native';
import { appConfig } from '@/constants/config';
import { colors, radius, spacing } from '@/theme';

export function InlineAdPlaceholder() {
  if (appConfig.adsEnabled) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Espacio publicitario (desactivado)</Text>
      <Text style={styles.hint}>Se activará con sponsors directos — sin AdMob en MVP.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2F6',
    borderRadius: radius.sm,
    padding: spacing.sm,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.mutedText,
  },
  hint: {
    fontSize: 11,
    color: colors.mutedText,
    marginTop: 2,
  },
});
