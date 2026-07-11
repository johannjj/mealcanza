import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ToolAccessButton } from '@/modules/suite/components/ToolAccessButton';
import { housingTools } from '@/config/modules';
import { homeCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
import { spacing } from '@/theme';

export function ViviendaHubScreen() {
  const router = useRouter();

  return (
    <>
      <PageSeo page={seoPages.vivienda} />
      <PageContainer header={<SiteHeader />} footer={<SiteFooter />}>
        <SectionHeader
          title={homeCopy.housingToolsTitle}
          subtitle="Calculadoras para estimar dividendo, refinanciamiento, capacidad de pago y renta necesaria."
        />
        <View style={styles.list}>
          {housingTools.map((tool) => (
            <ToolAccessButton
              key={tool.id}
              icon={tool.icon}
              label={tool.label}
              description={tool.description}
              onPress={() => router.push(tool.route)}
            />
          ))}
        </View>
      </PageContainer>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
});
