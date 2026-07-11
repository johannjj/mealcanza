import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { ResponsiveGrid } from '@/components/ui/ResponsiveGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  educationArticles,
  homeUpcomingModules,
  housingTools,
  housingUseCases,
} from '@/config/modules';
import { homeCopy, suiteCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
import { spacing } from '@/theme';
import { ComingSoonModuleCard } from '../components/ComingSoonModuleCard';
import { EducationCard } from '../components/EducationCard';
import { HeroSection } from '../components/HeroSection';
import { RecentSimulationsSection } from '../components/RecentSimulationsSection';
import { ToolAccessButton } from '../components/ToolAccessButton';
import { TrustSection } from '../components/TrustSection';
import { UfHeroCard } from '../components/UfHeroCard';
import { UseCaseCard } from '../components/UseCaseCard';

export function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <PageSeo page={seoPages.home} />
      <PageContainer
        header={<SiteHeader />}
        footer={<SiteFooter />}
      >
        <HeroSection />
        <UfHeroCard />

        <View style={styles.section}>
          <SectionHeader title={homeCopy.useCasesTitle} />
          <ResponsiveGrid maxColumns={2} desktopColumns={4} gap={spacing.sm}>
            {housingUseCases.map((useCase) => (
              <UseCaseCard
                key={useCase.id}
                useCase={useCase}
                onPress={() => router.push(useCase.route)}
              />
            ))}
          </ResponsiveGrid>
        </View>

        <View style={styles.section}>
          <SectionHeader title={homeCopy.housingToolsTitle} />
          <ResponsiveGrid maxColumns={2} gap={spacing.sm}>
            {housingTools.map((tool) => (
              <ToolAccessButton
                key={tool.id}
                icon={tool.icon}
                label={tool.label}
                description={tool.description}
                onPress={() => router.push(tool.route)}
              />
            ))}
          </ResponsiveGrid>
        </View>

        <RecentSimulationsSection />

        <TrustSection />

        <View style={styles.section}>
          <SectionHeader title={homeCopy.educationTitle} />
          <ResponsiveGrid maxColumns={2} desktopColumns={3} gap={spacing.sm}>
            {educationArticles.map((article) => (
              <EducationCard
                key={article.id}
                article={article}
                onPress={() => router.push(article.route)}
              />
            ))}
          </ResponsiveGrid>
        </View>

        <View style={styles.section} nativeID="proximos">
          <SectionHeader title={suiteCopy.upcomingModulesTitle} />
          <View style={styles.upcomingList}>
            {homeUpcomingModules.map((module) => (
              <ComingSoonModuleCard key={module.key} module={module} />
            ))}
          </View>
        </View>
      </PageContainer>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
    width: '100%',
  },
  upcomingList: {
    gap: spacing.sm,
  },
});
