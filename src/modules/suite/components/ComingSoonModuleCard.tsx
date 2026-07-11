import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { suiteCopy } from '@/constants/copy';
import type { SuiteModule } from '@/types/modules';
import { colors, radius, spacing } from '@/theme';

type Props = {
  module: SuiteModule;
};

export function ComingSoonModuleCard({ module }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.icon}>{module.icon}</Text>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{module.title}</Text>
          <Text style={styles.description}>{module.description}</Text>
        </View>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{suiteCopy.comingSoon}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    opacity: 0.72,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 24,
    width: 36,
    textAlign: 'center',
  },
  textBlock: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.mutedText,
  },
  description: {
    fontSize: 13,
    color: colors.mutedText,
    lineHeight: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.mutedText,
  },
});
