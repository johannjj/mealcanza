import { StyleSheet, Text } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme';

type Props = {
  text: string;
  title?: string;
};

export function DisclaimerCard({
  text,
  title = 'Importante',
}: Props) {
  return (
    <Card style={styles.card} accessibilityRole="text">
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.xs,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.mutedText,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  text: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.mutedText,
  },
});
