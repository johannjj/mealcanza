import { ReactNode, RefObject } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContentContainer } from '@/components/ui/ContentContainer';
import { colors, spacing } from '@/theme';
import { layout } from '@/theme/layout';

type Props = {
  children: ReactNode;
  footer?: ReactNode;
  scrollRef?: RefObject<ScrollView>;
  /**
   * true solo en pantallas sin header de navegación (ej. Home).
   * En simuladores con botón atrás debe ser false para no solapar el header.
   */
  safeAreaTop?: boolean;
  /** Limita el ancho (formularios en desktop). Por defecto formMaxWidth. */
  contentMaxWidth?: number;
};

export function ScreenLayout({
  children,
  footer,
  scrollRef,
  safeAreaTop = false,
  contentMaxWidth = layout.formMaxWidth,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safe}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.scroll,
          safeAreaTop ? { paddingTop: spacing.md + insets.top } : undefined,
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <ContentContainer maxWidth={contentMaxWidth}>{children}</ContentContainer>
        {footer ? (
          <ContentContainer maxWidth={contentMaxWidth} style={styles.footer}>
            {footer}
          </ContentContainer>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  footer: {
    marginTop: spacing.sm,
  },
});
