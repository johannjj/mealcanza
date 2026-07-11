import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { ResponsiveGrid } from '@/components/ui/ResponsiveGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EducationCard } from '@/modules/suite/components/EducationCard';
import { educationArticles } from '@/config/modules';
import { homeCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
import { colors, spacing } from '@/theme';

export function LearnIndexScreen() {
  const router = useRouter();

  return (
    <>
      <PageSeo page={seoPages.learn} />
      <PageContainer header={<SiteHeader />} footer={<SiteFooter />}>
        <SectionHeader
          title={homeCopy.educationTitle}
          subtitle="Guías breves para entender UF, carga financiera y refinanciamiento antes de simular."
        />
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
  note: {
    marginTop: spacing.sm,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.mutedText,
  },
});
