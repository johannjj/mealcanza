import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ResponsiveColumns } from '@/components/ui/ResponsiveColumns';
import { trustCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';

export function TrustCard() {
  return (
    <Card>
      <ResponsiveColumns maxColumns={2} gap={spacing.xs}>
        {trustCopy.items.map((item) => (
          <View key={item.text} style={styles.row}>
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </ResponsiveColumns>
    </Card>
  );
}

const styles = StyleSheet.create({
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
});
