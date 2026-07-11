import { StyleSheet, Text } from 'react-native';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageSeo } from '@/components/seo/PageSeo';
import { Card } from '@/components/ui/Card';
import { seoPages } from '@/constants/seo';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

const sections = [
  {
    title: 'Sin registro',
    body: 'La versión actual no requiere crear cuenta ni iniciar sesión para usar las calculadoras.',
  },
  {
    title: 'Simulaciones y servidores',
    body: 'No almacenamos tus simulaciones en servidores. Si utilizas el historial, se conserva únicamente en tu dispositivo y puedes borrarlo cuando quieras.',
  },
  {
    title: 'Datos personales',
    body: 'No almacenamos datos personales (nombre, email, teléfono, RUT) en servidores propios. Las simulaciones se procesan localmente en tu dispositivo o navegador.',
  },
  {
    title: 'Compartir resultados',
    body: 'La función de compartir utiliza las herramientas nativas del dispositivo o navegador. Tú eliges con quién compartir el mensaje.',
  },
  {
    title: 'Sin compartir con terceros',
    body: 'En esta versión no compartimos información personal con terceros ni usamos publicidad personalizada.',
  },
  {
    title: 'Permisos',
    body: 'La aplicación no solicita ubicación, contactos, cámara ni notificaciones en el MVP actual.',
  },
  {
    title: 'UF e indicadores',
    body: 'El valor de la UF se obtiene desde un servicio externo (mindicador.cl). Si no hay conexión, puede mostrarse un valor referencial de respaldo.',
  },
  {
    title: 'Almacenamiento local',
    body: 'Puede generarse un identificador anónimo local en el dispositivo para uso futuro. En esta versión no se transmite a servidores externos. El historial de simulaciones, si existe, solo guarda parámetros y resultados de cálculo en el dispositivo.',
  },
  {
    title: 'Cambios futuros',
    body: 'Si activamos backend, analytics o publicidad, actualizaremos esta política antes de recolectar o transmitir datos adicionales.',
  },
] as const;

export function PrivacyScreen() {
  return (
    <>
      <PageSeo page={seoPages.privacy} />
      <PageContainer
        header={<SiteHeader />}
        footer={<SiteFooter />}
        contentMaxWidth={layout.formMaxWidth}
      >
        <Text style={styles.title} accessibilityRole="header">
          Política de privacidad
        </Text>
        <Text style={styles.intro}>
          Esta política describe el tratamiento de información en la versión actual de ¿Me
          alcanza? Es un resumen orientativo alineado al comportamiento real de la app.
        </Text>
        {sections.map((section) => (
          <Card key={section.title} style={styles.card}>
            <Text style={styles.heading}>{section.title}</Text>
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
