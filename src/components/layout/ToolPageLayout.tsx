import { ReactNode, RefObject } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { PageContainer } from '@/components/layout/PageContainer';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { layout } from '@/theme/layout';

type Props = {
  children: ReactNode;
  scrollRef?: RefObject<ScrollView>;
  contentStyle?: ViewStyle;
};

/**
 * Layout de herramientas: mismo header/menú y footer que el Home.
 * Ancho de formulario acotado en desktop.
 */
export function ToolPageLayout({ children, scrollRef, contentStyle }: Props) {
  return (
    <PageContainer
      header={<SiteHeader />}
      footer={<SiteFooter />}
      scrollRef={scrollRef}
      contentMaxWidth={layout.formMaxWidth}
      contentStyle={[styles.content, contentStyle]}
    >
      {children}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
  },
});
