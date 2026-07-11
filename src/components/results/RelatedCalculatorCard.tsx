import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { layout } from '@/theme/layout';
import { colors, spacing } from '@/theme';

type Props = {
  title: string;
  description: string;
  onPress: () => void;
};

export function RelatedCalculatorCard({ title, description, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.actionRow}>
          <Text style={styles.action}>Abrir</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.92 },
  card: {
    gap: spacing.sm,
    minHeight: layout.minTouchTarget * 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.mutedText,
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: layout.minTouchTarget - 8,
  },
  action: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  chevron: {
    fontSize: 20,
    color: colors.primary,
  },
});
