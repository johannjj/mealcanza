import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme';

type Faq = { question: string; answer: string };

type Props = {
  title: string;
  whatItCalculates: string;
  dataUsed: string;
  howToRead: string;
  limitations: string;
  faqs?: Faq[];
};

/** Contenido SEO visible (no oculto tras JS de resultado). */
export function CalculatorExplainer({
  title,
  whatItCalculates,
  dataUsed,
  howToRead,
  limitations,
  faqs = [],
}: Props) {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <Text style={styles.title}>{title}</Text>
      <Card style={styles.card}>
        <Text style={styles.heading}>Qué calcula</Text>
        <Text style={styles.body}>{whatItCalculates}</Text>
        <Text style={styles.heading}>Qué datos utiliza</Text>
        <Text style={styles.body}>{dataUsed}</Text>
        <Text style={styles.heading}>Cómo interpretar el resultado</Text>
        <Text style={styles.body}>{howToRead}</Text>
        <Text style={styles.heading}>Limitaciones</Text>
        <Text style={styles.body}>{limitations}</Text>
      </Card>
      {faqs.length > 0 ? (
        <Card style={styles.card}>
          <Text style={styles.heading}>Preguntas frecuentes</Text>
          {faqs.map((faq) => (
            <View key={faq.question} style={styles.faq}>
              <Text style={styles.faqQ}>{faq.question}</Text>
              <Text style={styles.body}>{faq.answer}</Text>
            </View>
          ))}
        </Card>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
    gap: spacing.sm,
  },
  heading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.xs,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.mutedText,
  },
  faq: {
    gap: 4,
    marginTop: spacing.sm,
  },
  faqQ: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
});
