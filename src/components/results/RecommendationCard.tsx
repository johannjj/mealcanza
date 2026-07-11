import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme';

type Props = {
  title: string;
  message: string;
  icon?: string;
};

export function RecommendationCard({ title, message, icon = '💡' }: Props) {
  return (
    <Card style={styles.card} accessibilityRole="summary">
      <View style={styles.header}>
        <Text style={styles.icon} accessibilityElementsHidden>
          {icon}
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    backgroundColor: '#F0F7F9',
    borderColor: '#D0E4EA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
});
