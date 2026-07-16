import { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppLink } from '@/components/ui/AppLink';
import { ContentContainer } from '@/components/ui/ContentContainer';
import { navCopy, suiteCopy } from '@/constants/copy';
import { useResponsive } from '@/hooks/useResponsive';
import { routes } from '@/navigation/routes';
import type { AppRoute } from '@/navigation/routes';
import { colors, radius, spacing } from '@/theme';
import { layout } from '@/theme/layout';

const headerLogo = require('../../../assets/brand/mealcanza2.png');

const navItems = [
  { label: navCopy.home, href: routes.home },
  { label: navCopy.vivienda, href: routes.vivienda },
  { label: navCopy.learn, href: routes.learn },
  { label: navCopy.comingSoon, href: `${routes.home}#proximos`, isHash: true },
] as const;

type Props = {
  /** Incluye safe area superior (Home sin Stack header). */
  withSafeArea?: boolean;
};

export function SiteHeader({ withSafeArea = true }: Props) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { isMobile } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => {
    if (href === routes.home || href.startsWith(`${routes.home}#`)) {
      return pathname === '/' || pathname === '';
    }
    const base = href.split('#')[0];
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  const linkHref = (item: (typeof navItems)[number]): AppRoute =>
    'isHash' in item && item.isHash ? routes.home : (item.href as AppRoute);

  return (
    <View
      style={[
        styles.wrap,
        withSafeArea ? { paddingTop: insets.top } : undefined,
        Platform.OS === 'web' ? styles.stickyWeb : undefined,
      ]}
    >
      <ContentContainer style={styles.inner}>
        <View style={styles.row}>
          <AppLink
            href={routes.home}
            style={styles.brandBlock}
            accessibilityLabel={`${suiteCopy.appName}. Ir al inicio`}
          >
            <Image
              source={headerLogo}
              style={[styles.brandLogo, isMobile && styles.brandLogoMobile]}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </AppLink>

          {!isMobile ? (
            <View style={styles.nav}>
              {navItems.map((item) => (
                <AppLink
                  key={item.label}
                  href={linkHref(item)}
                  style={styles.navItem}
                  onPress={closeMenu}
                  accessibilityLabel={item.label}
                >
                  <Text
                    style={[styles.navLabel, isActive(item.href) && styles.navLabelActive]}
                  >
                    {item.label}
                  </Text>
                </AppLink>
              ))}
            </View>
          ) : (
            <Pressable
              onPress={() => setMenuOpen((v) => !v)}
              style={styles.menuButton}
              accessibilityRole="button"
              accessibilityLabel={menuOpen ? navCopy.closeMenu : navCopy.menu}
            >
              <Text style={styles.menuButtonText}>{menuOpen ? '✕' : '☰'}</Text>
            </Pressable>
          )}
        </View>

        {isMobile && menuOpen ? (
          <View style={styles.mobileMenu}>
            {navItems.map((item) => (
              <AppLink
                key={item.label}
                href={linkHref(item)}
                style={styles.mobileItem}
                onPress={closeMenu}
                accessibilityLabel={item.label}
              >
                <Text
                  style={[styles.mobileLabel, isActive(item.href) && styles.navLabelActive]}
                >
                  {item.label}
                </Text>
              </AppLink>
            ))}
          </View>
        ) : null}
      </ContentContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 20,
  },
  stickyWeb: {
    position: 'sticky' as 'relative',
    top: 0,
  },
  inner: {
    gap: 0,
    paddingVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    minHeight: layout.minTouchTarget + 8,
  },
  brandBlock: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  brandLogo: {
    width: 280,
    height: 60,
  },
  brandLogoMobile: {
    width: 210,
    height: 46,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  navItem: {
    minHeight: layout.minTouchTarget,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedText,
  },
  navLabelActive: {
    color: colors.primary,
  },
  menuButton: {
    minWidth: layout.minTouchTarget,
    minHeight: layout.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuButtonText: {
    fontSize: 18,
    color: colors.primary,
  },
  mobileMenu: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  mobileItem: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  mobileLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
