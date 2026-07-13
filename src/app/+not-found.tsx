import { StyleSheet, Text, View } from 'react-native';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { AppLink } from '@/components/ui/AppLink';
import { Heading } from '@/components/ui/Heading';
import { seoPages } from '@/constants/seo';
import { routes } from '@/navigation/routes';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

export default function NotFoundScreen() {
  return (
    <>
      <PageSeo page={seoPages.notFound} />
      <PageContainer header={<SiteHeader />} footer={<SiteFooter />}>
        <View style={styles.wrap}>
          <Heading level={1} style={styles.title}>
            No encontramos esta página
          </Heading>
          <Text style={styles.body}>
            Puedes volver al inicio o abrir una de nuestras calculadoras.
          </Text>
          <View style={styles.links}>
            <AppLink href={routes.home} textStyle={styles.link} accessibilityLabel="Inicio">
              Inicio
            </AppLink>
            <AppLink
              href={routes.mortgage}
              textStyle={styles.link}
              accessibilityLabel="Simular crédito"
            >
              Simular crédito
            </AppLink>
            <AppLink
              href={routes.incomeRequired}
              textStyle={styles.link}
              accessibilityLabel="¿Cuánto debería ganar?"
            >
              ¿Cuánto debería ganar?
            </AppLink>
            <AppLink href={routes.learn} textStyle={styles.link} accessibilityLabel="Aprende">
              Aprende
            </AppLink>
          </View>
        </View>
      </PageContainer>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
    paddingVertical: spacing.lg,
    maxWidth: layout.formMaxWidth,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedText,
  },
  links: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
    minHeight: layout.minTouchTarget,
    lineHeight: layout.minTouchTarget,
  },
});
