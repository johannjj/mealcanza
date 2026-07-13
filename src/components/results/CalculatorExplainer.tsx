import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { AppLink } from '@/components/ui/AppLink';
import type { Href } from 'expo-router';
import { colors, spacing } from '@/theme';

export type Faq = { question: string; answer: string };

export type RelatedLink = { label: string; href: Href };

type Props = {
  /** H2 principal de la sección educativa */
  title: string;
  intro?: string;
  sections?: { heading: string; body: string }[];
  whatItCalculates: string;
  dataUsed: string;
  howToRead: string;
  limitations: string;
  faqs?: Faq[];
  relatedLinks?: RelatedLink[];
};

/** Contenido SEO visible (no oculto tras JS de resultado). */
export function CalculatorExplainer({
  title,
  intro,
  sections = [],
  whatItCalculates,
  dataUsed,
  howToRead,
  limitations,
  faqs = [],
  relatedLinks = [],
}: Props) {
  return (
    <View style={styles.wrap}>
      <Heading level={2} style={styles.title}>
        {title}
      </Heading>
      {intro ? <Text style={styles.body}>{intro}</Text> : null}

      {sections.map((section) => (
        <Card key={section.heading} style={styles.card}>
          <Heading level={3} style={styles.heading}>
            {section.heading}
          </Heading>
          <Text style={styles.body}>{section.body}</Text>
        </Card>
      ))}

      <Card style={styles.card}>
        <Heading level={3} style={styles.heading}>
          Qué calcula
        </Heading>
        <Text style={styles.body}>{whatItCalculates}</Text>
        <Heading level={3} style={styles.heading}>
          Qué datos utiliza
        </Heading>
        <Text style={styles.body}>{dataUsed}</Text>
        <Heading level={3} style={styles.heading}>
          Cómo interpretar el resultado
        </Heading>
        <Text style={styles.body}>{howToRead}</Text>
        <Heading level={3} style={styles.heading}>
          Limitaciones
        </Heading>
        <Text style={styles.body}>{limitations}</Text>
      </Card>

      {faqs.length > 0 ? (
        <Card style={styles.card}>
          <Heading level={2} style={styles.faqTitle}>
            Preguntas frecuentes
          </Heading>
          {faqs.map((faq) => (
            <View key={faq.question} style={styles.faq}>
              <Heading level={3} style={styles.faqQ}>
                {faq.question}
              </Heading>
              <Text style={styles.body}>{faq.answer}</Text>
            </View>
          ))}
        </Card>
      ) : null}

      {relatedLinks.length > 0 ? (
        <Card style={styles.card}>
          <Heading level={3} style={styles.heading}>
            Artículos y herramientas relacionadas
          </Heading>
          <View style={styles.links}>
            {relatedLinks.map((link) => (
              <AppLink
                key={link.href.toString()}
                href={link.href}
                textStyle={styles.link}
                accessibilityLabel={link.label}
              >
                {link.label}
              </AppLink>
            ))}
          </View>
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  faqTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
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
  links: {
    gap: spacing.sm,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
    lineHeight: 22,
  },
});
