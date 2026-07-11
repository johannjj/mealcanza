import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ResponsiveGrid } from '@/components/ui/ResponsiveGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { trustCopy, suiteCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';

export function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.row} accessibilityRole="text">
      <View style={styles.iconWrap} accessibilityElementsHidden>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export function TrustSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title={trustCopy.title} subtitle={suiteCopy.slogan} />
      <Card>
        <ResponsiveGrid maxColumns={2} gap={spacing.xs}>
          {trustCopy.items.map((item) => (
            <TrustItem key={item.text} icon={item.icon} text={item.text} />
          ))}
        </ResponsiveGrid>
        <Text style={styles.authority}>{trustCopy.authority}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.success,
  },
  text: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  authority: {
    marginTop: spacing.md,
    fontSize: 14,
    lineHeight: 21,
    color: colors.mutedText,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
});
