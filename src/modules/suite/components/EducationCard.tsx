import { Pressable, StyleSheet, Text } from 'react-native';
import { Card } from '@/components/ui/Card';
import { homeCopy } from '@/constants/copy';
import { layout } from '@/theme/layout';
import { colors, spacing } from '@/theme';
import type { EducationArticle } from '@/types/modules';

type Props = {
  article: EducationArticle;
  onPress: () => void;
};

export function EducationCard({ article, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
      accessibilityRole="link"
      accessibilityLabel={article.title}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.cta}>{homeCopy.educationCta} ›</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.92,
  },
  card: {
    gap: spacing.sm,
    minHeight: layout.minTouchTarget * 2.2,
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
    flex: 1,
  },
  cta: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.xs,
  },
});
