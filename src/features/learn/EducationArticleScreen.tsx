import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Disclaimer } from '@/components/ui/Disclaimer';
import type { PageSeoConfig } from '@/constants/seo';
import type { EducationPageContent } from '@/constants/education';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

type Props = {
  content: EducationPageContent;
  seo: PageSeoConfig;
};

export function EducationArticleScreen({ content, seo }: Props) {
  const router = useRouter();

  return (
    <>
      <PageSeo page={seo} />
      <PageContainer
        header={<SiteHeader />}
        footer={<SiteFooter />}
        contentMaxWidth={layout.formMaxWidth}
      >
        <Text style={styles.title} accessibilityRole="header">
          {content.title}
        </Text>
        <Text style={styles.intro}>{content.introduction}</Text>

        <Card style={styles.block}>
          <Text style={styles.heading}>Explicación simple</Text>
          <Text style={styles.body}>{content.explanation}</Text>
        </Card>

        <Card style={styles.block}>
          <Text style={styles.heading}>{content.exampleTitle}</Text>
          <Text style={styles.body}>{content.exampleBody}</Text>
        </Card>

        <Disclaimer text={content.disclaimer} />

        <View style={styles.cta}>
          <Button label={content.ctaLabel} onPress={() => router.push(content.ctaRoute)} />
        </View>
      </PageContainer>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 32,
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  block: {
    gap: spacing.sm,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.mutedText,
  },
  cta: {
    marginTop: spacing.sm,
  },
});
