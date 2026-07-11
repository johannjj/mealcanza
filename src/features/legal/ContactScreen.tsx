import { Linking, StyleSheet, Text, View } from 'react-native';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { appConfig } from '@/config/appConfig';
import { seoPages } from '@/constants/seo';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

export function ContactScreen() {
  const email = appConfig.contactEmail.trim();
  const hasEmail = email.length > 0;

  return (
    <>
      <PageSeo page={seoPages.contact} />
      <PageContainer
        header={<SiteHeader />}
        footer={<SiteFooter />}
        contentMaxWidth={layout.formMaxWidth}
      >
        <Text style={styles.title} accessibilityRole="header">
          Contacto
        </Text>
        <Text style={styles.intro}>
          ¿Me alcanza? es una herramienta de simulación referencial. En esta versión no hay
          backend ni formulario de contacto con envío de datos.
        </Text>
        <Card style={styles.card}>
          {hasEmail ? (
            <View style={styles.block}>
              <Text style={styles.label}>Correo</Text>
              <Text style={styles.email}>{email}</Text>
              <Button
                label="Escribir correo"
                onPress={() => void Linking.openURL(`mailto:${email}`)}
              />
            </View>
          ) : (
            <View style={styles.block}>
              <Text style={styles.soonTitle}>Próximamente</Text>
              <Text style={styles.body}>
                Aún no hay un canal de contacto público configurado. Cuando esté disponible,
                aparecerá aquí (configura `contactEmail` en la app).
              </Text>
            </View>
          )}
        </Card>
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
    gap: spacing.md,
  },
  block: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.mutedText,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  soonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.mutedText,
  },
});
