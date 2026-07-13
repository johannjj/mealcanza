import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { AppLink } from '@/components/ui/AppLink';
import { Breadcrumbs, breadcrumbsToSeo } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Heading } from '@/components/ui/Heading';
import type { PageSeoConfig } from '@/constants/seo';
import type { EducationPageContent } from '@/constants/education';
import { navCopy } from '@/constants/copy';
import { routes } from '@/navigation/routes';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

type Props = {
  content: EducationPageContent;
  seo: PageSeoConfig;
};

export function EducationArticleScreen({ content, seo }: Props) {
  const router = useRouter();
  const breadcrumbs = [
    { label: navCopy.home, href: routes.home },
    { label: navCopy.learn, href: routes.learn },
    { label: content.title },
  ];

  return (
    <>
      <PageSeo page={seo} breadcrumbs={breadcrumbsToSeo(breadcrumbs, seo.path)} />
      <PageContainer
        header={<SiteHeader />}
        footer={<SiteFooter />}
        contentMaxWidth={layout.formMaxWidth}
      >
        <Breadcrumbs items={breadcrumbs} />
        <Heading level={1} style={styles.title}>
          {content.title}
        </Heading>
        <Text style={styles.updated}>{content.updatedAt}</Text>
        <Text style={styles.intro}>{content.introduction}</Text>

        <Card style={styles.block}>
          <Heading level={2} style={styles.heading}>
            Explicación simple
          </Heading>
          <Text style={styles.body}>{content.explanation}</Text>
        </Card>

        <Card style={styles.block}>
          <Heading level={2} style={styles.heading}>
            {content.exampleTitle}
          </Heading>
          <Text style={styles.body}>{content.exampleBody}</Text>
        </Card>

        <Card style={styles.block}>
          <Heading level={2} style={styles.heading}>
            Contexto en Chile
          </Heading>
          <Text style={styles.body}>{content.chileContext}</Text>
        </Card>

        <Card style={styles.block}>
          <Heading level={2} style={styles.heading}>
            Fuentes y referencias
          </Heading>
          <Text style={styles.body}>{content.sources}</Text>
        </Card>

        {content.relatedLinks && content.relatedLinks.length > 0 ? (
          <View style={styles.related}>
            <Heading level={2} style={styles.heading}>
              También te puede servir
            </Heading>
            <View style={styles.relatedLinks}>
              {content.relatedLinks.map((link) => (
                <AppLink
                  key={link.href}
                  href={link.href}
                  style={styles.relatedLink}
                  textStyle={styles.relatedLinkText}
                >
                  {link.label}
                </AppLink>
              ))}
            </View>
          </View>
        ) : null}

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
  updated: {
    fontSize: 13,
    color: colors.mutedText,
    marginTop: -spacing.xs,
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
  related: {
    gap: spacing.sm,
  },
  relatedLinks: {
    gap: spacing.xs,
  },
  relatedLink: {
    minHeight: 40,
    justifyContent: 'center',
  },
  relatedLinkText: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '600',
  },
  cta: {
    marginTop: spacing.sm,
  },
});
