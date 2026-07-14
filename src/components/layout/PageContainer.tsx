import { ReactNode, RefObject } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContentContainer } from '@/components/ui/ContentContainer';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  scrollRef?: RefObject<ScrollView>;
  safeAreaTop?: boolean;
  contentMaxWidth?: number;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Contenedor de página reutilizable: header opcional + scroll + footer.
 * Preferir sobre ScreenLayout cuando se necesita SiteHeader / SiteFooter.
 */
export function PageContainer({
  children,
  header,
  footer,
  scrollRef,
  safeAreaTop = false,
  contentMaxWidth = layout.maxContentWidth,
  contentStyle,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {header}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.scroll,
          header ? styles.scrollWithHeader : undefined,
          safeAreaTop && !header ? { paddingTop: spacing.md + insets.top } : undefined,
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <ContentContainer maxWidth={contentMaxWidth} style={contentStyle}>
          {children}
        </ContentContainer>
        {footer ? (
          <View style={styles.footerWrap}>{footer}</View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  scrollWithHeader: {
    paddingTop: spacing.md,
  },
  footerWrap: {
    width: '100%',
    marginTop: spacing.xl,
  },
});
