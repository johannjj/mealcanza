import { StyleSheet, Text, View } from 'react-native';
import { AppLink } from '@/components/ui/AppLink';
import { ContentContainer } from '@/components/ui/ContentContainer';
import { ResponsiveGrid } from '@/components/ui/ResponsiveGrid';
import { educationArticles, housingTools } from '@/config/modules';
import { footerCopy, suiteCopy } from '@/constants/copy';
import { routes } from '@/navigation/routes';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

export function SiteFooter() {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <ContentContainer style={styles.inner}>
        <ResponsiveGrid maxColumns={2} desktopColumns={4} gap={spacing.lg}>
          <View style={styles.column}>
            <Text style={styles.brand}>{suiteCopy.appName}</Text>
            <Text style={styles.slogan}>{suiteCopy.slogan}</Text>
            <Text style={styles.blurb}>{suiteCopy.footerBlurb}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.heading}>{footerCopy.toolsTitle}</Text>
            {housingTools.map((tool) => (
              <AppLink
                key={tool.id}
                href={tool.route}
                style={styles.link}
                textStyle={styles.linkText}
              >
                {tool.label}
              </AppLink>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.heading}>{footerCopy.learnTitle}</Text>
            {educationArticles.map((article, index) => (
              <AppLink
                key={article.id}
                href={article.route}
                style={styles.link}
                textStyle={styles.linkText}
              >
                {index === 0
                  ? footerCopy.learnUf
                  : index === 1
                    ? footerCopy.learnLoad
                    : footerCopy.learnRefinance}
              </AppLink>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.heading}>{footerCopy.legalTitle}</Text>
            <AppLink
              href={routes.privacy}
              style={styles.link}
              textStyle={styles.linkText}
            >
              {footerCopy.privacy}
            </AppLink>
            <AppLink href={routes.terms} style={styles.link} textStyle={styles.linkText}>
              {footerCopy.terms}
            </AppLink>
            <AppLink href={routes.contact} style={styles.link} textStyle={styles.linkText}>
              {footerCopy.contact}
            </AppLink>
          </View>
        </ResponsiveGrid>

        <View style={styles.bottom}>
          <Text style={styles.copyright}>{suiteCopy.copyright}</Text>
          <Text style={styles.disclaimer}>{suiteCopy.footerDisclaimer}</Text>
        </View>
      </ContentContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  inner: {
    gap: spacing.lg,
  },
  column: {
    gap: spacing.sm,
    minWidth: layout.minColumnWidth - 40,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  slogan: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },
  blurb: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.85)',
  },
  heading: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: spacing.xs,
  },
  link: {
    minHeight: 40,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  copyright: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.7)',
  },
});
