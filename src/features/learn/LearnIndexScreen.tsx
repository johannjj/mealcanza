import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { Breadcrumbs, breadcrumbsToSeo } from '@/components/ui/Breadcrumbs';
import { Heading } from '@/components/ui/Heading';
import { ResponsiveGrid } from '@/components/ui/ResponsiveGrid';
import { EducationCard } from '@/modules/suite/components/EducationCard';
import { educationArticles } from '@/config/modules';
import { navCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
import { routes } from '@/navigation/routes';
import { colors, spacing } from '@/theme';

const PAGE_TITLE = 'Guías para comprar vivienda y entender la UF';

const breadcrumbs = [
  { label: navCopy.home, href: routes.home },
  { label: navCopy.learn },
];

export function LearnIndexScreen() {
  const router = useRouter();

  return (
    <>
      <PageSeo page={seoPages.learn} breadcrumbs={breadcrumbsToSeo(breadcrumbs, routes.learn)} />
      <PageContainer header={<SiteHeader />} footer={<SiteFooter />}>
        <Breadcrumbs items={breadcrumbs} />
        <Heading level={1} style={styles.title}>
          {PAGE_TITLE}
        </Heading>
        <Text style={styles.subtitle}>
          Guías breves para entender UF, carga financiera y refinanciamiento antes de simular.
        </Text>
        <ResponsiveGrid maxColumns={2} desktopColumns={3} gap={spacing.sm}>
          {educationArticles.map((article) => (
            <EducationCard
              key={article.id}
              article={article}
              onPress={() => router.push(article.route)}
            />
          ))}
        </ResponsiveGrid>
        <View style={styles.note}>
          <Text style={styles.noteText}>
            El contenido es educativo y referencial. No reemplaza asesoría profesional ni
            condiciones de un banco.
          </Text>
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
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  note: {
    marginTop: spacing.sm,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.mutedText,
  },
});
