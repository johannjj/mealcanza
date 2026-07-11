import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { mortgageCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';

export function MortgageImproveTipsCard() {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{mortgageCopy.improveTitle}</Text>
      {mortgageCopy.improveTips.map((tip) => (
        <View key={tip} style={styles.tipRow}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  tipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 14,
    color: colors.secondary,
    lineHeight: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.mutedText,
    lineHeight: 20,
  },
});
