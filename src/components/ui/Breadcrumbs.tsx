import { StyleSheet, Text, View } from 'react-native';
import { AppLink } from '@/components/ui/AppLink';
import type { AppRoute } from '@/navigation/routes';
import { colors, spacing } from '@/theme';

/** Datos para JSON-LD vía PageSeo. */
export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type BreadcrumbDisplayItem = {
  label: string;
  href?: AppRoute | string;
};

type Props = {
  items: BreadcrumbDisplayItem[];
};

/**
 * Migas de pan visibles. El último ítem suele omitir `href` (página actual).
 */
export function Breadcrumbs({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <View style={styles.wrap} accessibilityRole="none">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const hasLink = Boolean(item.href) && !isLast;
        return (
          <View key={`${item.label}-${index}`} style={styles.segment}>
            {index > 0 ? <Text style={styles.separator}>/</Text> : null}
            {hasLink && item.href ? (
              <AppLink href={item.href as AppRoute} textStyle={styles.link}>
                {item.label}
              </AppLink>
            ) : (
              <Text style={styles.current} accessibilityRole="text">
                {item.label}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

/** Convierte migas visibles al formato de PageSeo / JSON-LD. */
export function breadcrumbsToSeo(
  items: BreadcrumbDisplayItem[],
  currentPath: string,
): BreadcrumbItem[] {
  return items.map((item, index) => ({
    name: item.label,
    path: (item.href as string) ?? currentPath,
  }));
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  separator: {
    fontSize: 13,
    color: colors.mutedText,
  },
  link: {
    fontSize: 13,
    color: colors.secondary,
    fontWeight: '600',
  },
  current: {
    fontSize: 13,
    color: colors.mutedText,
    fontWeight: '500',
  },
});
