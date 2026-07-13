import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { Breadcrumbs, breadcrumbsToSeo } from '@/components/ui/Breadcrumbs';
import { Heading } from '@/components/ui/Heading';
import { ToolAccessButton } from '@/modules/suite/components/ToolAccessButton';
import { housingTools } from '@/config/modules';
import { navCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
import { routes } from '@/navigation/routes';
import { colors, spacing } from '@/theme';

const PAGE_TITLE = 'Calculadoras para comprar vivienda en Chile';

const breadcrumbs = [
  { label: navCopy.home, href: routes.home },
  { label: navCopy.vivienda },
];

export function ViviendaHubScreen() {
  const router = useRouter();

  return (
    <>
      <PageSeo
        page={seoPages.vivienda}
        breadcrumbs={breadcrumbsToSeo(breadcrumbs, routes.vivienda)}
      />
      <PageContainer header={<SiteHeader />} footer={<SiteFooter />}>
        <Breadcrumbs items={breadcrumbs} />
        <Heading level={1} style={styles.title}>
          {PAGE_TITLE}
        </Heading>
        <Text style={styles.subtitle}>
          Calculadoras para estimar dividendo, refinanciamiento, capacidad de pago y renta
          necesaria.
        </Text>
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
  list: {
    gap: spacing.sm,
  },
});
