import { StyleSheet, Text } from 'react-native';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { Breadcrumbs, breadcrumbsToSeo } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { navCopy } from '@/constants/copy';
import { seoPages } from '@/constants/seo';
import { routes } from '@/navigation/routes';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

const PAGE_TITLE = 'Términos de uso';

const breadcrumbs = [
  { label: navCopy.home, href: routes.home },
  { label: PAGE_TITLE },
];

const sections = [
  {
    title: 'Carácter referencial',
    body: 'Las calculadoras de ¿Me alcanza? entregan estimaciones referenciales. No constituyen asesoría financiera, legal ni tributaria profesional.',
  },
  {
    title: 'Sin garantía de aprobación',
    body: 'Los resultados no garantizan la aprobación de un crédito ni las condiciones que ofrezca un banco u otra institución financiera.',
  },
  {
    title: 'Tasas y condiciones variables',
    body: 'Las tasas de interés, seguros, costos asociados y políticas crediticias pueden variar. Debes validar siempre las condiciones vigentes con la institución correspondiente.',
  },
  {
    title: 'Dependencia de los datos ingresados',
    body: 'Los resultados dependen de los valores que ingreses (propiedad, pie, tasa, plazo, renta, etc.). Datos incompletos o incorrectos producen estimaciones poco útiles.',
  },
  {
    title: 'Validación externa',
    body: 'Antes de tomar una decisión de compra o refinanciamiento, contrasta la simulación con cotizaciones formales y, si corresponde, con un profesional calificado.',
  },
  {
    title: 'Limitación de responsabilidad',
    body: 'En la medida permitida por la ley, ¿Me alcanza? no se responsabiliza por decisiones tomadas únicamente con base en estas simulaciones, ni por diferencias entre el resultado estimado y las condiciones reales de un crédito.',
  },
] as const;

export function TermsScreen() {
  return (
    <>
      <PageSeo page={seoPages.terms} breadcrumbs={breadcrumbsToSeo(breadcrumbs, routes.terms)} />
      <PageContainer
        header={<SiteHeader />}
        footer={<SiteFooter />}
        contentMaxWidth={layout.formMaxWidth}
      >
        <Breadcrumbs items={breadcrumbs} />
        <Heading level={1} style={styles.title}>
          {PAGE_TITLE}
        </Heading>
        <Text style={styles.intro}>
          Al usar ¿Me alcanza? aceptas que las herramientas son de carácter informativo y
          referencial.
        </Text>
        {sections.map((section) => (
          <Card key={section.title} style={styles.card}>
            <Heading level={2} style={styles.heading}>
              {section.title}
            </Heading>
            <Text style={styles.body}>{section.body}</Text>
          </Card>
        ))}
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
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
  },
  card: {
    gap: spacing.xs,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.mutedText,
  },
});
