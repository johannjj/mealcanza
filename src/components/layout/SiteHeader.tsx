import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContentContainer } from '@/components/ui/ContentContainer';
import { navCopy, suiteCopy } from '@/constants/copy';
import { useResponsive } from '@/hooks/useResponsive';
import { routes } from '@/navigation/routes';
import { colors, radius, spacing } from '@/theme';
import { layout } from '@/theme/layout';

const navItems = [
  { label: navCopy.home, href: routes.home },
  { label: navCopy.vivienda, href: routes.vivienda },
  { label: navCopy.learn, href: routes.learn },
  { label: navCopy.comingSoon, href: `${routes.home}#proximos` as typeof routes.home },
] as const;

type Props = {
  /** Incluye safe area superior (Home sin Stack header). */
  withSafeArea?: boolean;
};

export function SiteHeader({ withSafeArea = true }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { isMobile } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (href: string) => {
    setMenuOpen(false);
    if (href.includes('#')) {
      router.push(routes.home);
      return;
    }
    router.push(href as '/');
  };

  const isActive = (href: string) => {
    if (href === routes.home) return pathname === '/' || pathname === '';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <View
      style={[
        styles.wrap,
        withSafeArea ? { paddingTop: insets.top } : undefined,
        Platform.OS === 'web' ? styles.stickyWeb : undefined,
      ]}
      accessibilityRole="header"
    >
      <ContentContainer style={styles.inner}>
        <View style={styles.row}>
          <Pressable
            onPress={() => go(routes.home)}
            style={styles.brandBlock}
            accessibilityRole="link"
            accessibilityLabel={`${suiteCopy.appName}. Ir al inicio`}
          >
            <Text style={styles.brand}>{suiteCopy.appName}</Text>
            {!isMobile ? <Text style={styles.tagline}>{suiteCopy.tagline}</Text> : null}
          </Pressable>

          {!isMobile ? (
            <View style={styles.nav}>
              {navItems.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => go(item.href)}
                  style={styles.navItem}
                  accessibilityRole="link"
                  accessibilityState={{ selected: isActive(item.href) }}
                >
                  <Text
                    style={[styles.navLabel, isActive(item.href) && styles.navLabelActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
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
              <Pressable
                key={item.label}
                onPress={() => go(item.href)}
                style={styles.mobileItem}
                accessibilityRole="link"
              >
                <Text
                  style={[styles.mobileLabel, isActive(item.href) && styles.navLabelActive]}
                >
                  {item.label}
                </Text>
              </Pressable>
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
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    minHeight: layout.minTouchTarget,
  },
  brandBlock: {
    flexShrink: 1,
    gap: 2,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  tagline: {
    fontSize: 12,
    color: colors.mutedText,
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
