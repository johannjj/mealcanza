import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { layout } from '@/theme/layout';
import { colors, spacing } from '@/theme';
import type { UseCase } from '@/types/modules';

type Props = {
  useCase: UseCase;
  onPress: () => void;
};

export function UseCaseCard({ useCase, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${useCase.title}. ${useCase.actionLabel}`}
    >
      <Card style={styles.card}>
        <View style={styles.body}>
          <Text style={styles.title}>{useCase.title}</Text>
          <Text style={styles.description}>{useCase.description}</Text>
        </View>
        <View style={styles.actionRow}>
          <Text style={styles.action}>{useCase.actionLabel}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.92,
  },
  card: {
    flex: 1,
    gap: spacing.sm,
    minHeight: layout.minTouchTarget * 2.5,
    justifyContent: 'space-between',
  },
  body: {
    gap: spacing.sm,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: colors.mutedText,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
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
    fontWeight: '300',
  },
});
