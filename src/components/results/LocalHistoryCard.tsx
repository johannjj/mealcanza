import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { layout } from '@/theme/layout';
import { colors, spacing } from '@/theme';
import type { SimulationHistoryEntry } from '@/types/simulationHistory';
import { formatDateCL } from '@/utils/date';

type Props = {
  entry: SimulationHistoryEntry;
  onOpen: () => void;
  onDelete: () => void;
};

const typeLabels: Record<SimulationHistoryEntry['type'], string> = {
  mortgage: 'Simular crédito',
  refinance: 'Refinanciamiento',
  affordability: 'Capacidad de pago',
  'income-required': '¿Cuánto debería ganar?',
};

export function LocalHistoryCard({ entry, onOpen, onDelete }: Props) {
  const confirmDelete = () => {
    Alert.alert('Eliminar simulación', '¿Quieres eliminar este registro del historial local?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: onDelete },
    ]);
  };

  return (
    <Card style={styles.card}>
      <Pressable
        onPress={onOpen}
        accessibilityRole="button"
        accessibilityLabel={`Abrir ${typeLabels[entry.type]}, ${entry.primaryResultValue}`}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <Text style={styles.type}>{typeLabels[entry.type]}</Text>
        <Text style={styles.value}>
          {entry.primaryResultLabel}: {entry.primaryResultValue}
        </Text>
        <Text style={styles.meta}>
          {formatDateCL(entry.createdAt)}
          {entry.statusLabel ? ` · ${entry.statusLabel}` : ''}
        </Text>
      </Pressable>
      <View style={styles.actions}>
        <Pressable
          onPress={onOpen}
          style={styles.actionBtn}
          accessibilityRole="button"
          accessibilityLabel="Volver a abrir simulación"
        >
          <Text style={styles.actionText}>Abrir</Text>
        </Pressable>
        <Pressable
          onPress={confirmDelete}
          style={styles.actionBtn}
          accessibilityRole="button"
          accessibilityLabel="Eliminar del historial"
        >
          <Text style={[styles.actionText, styles.delete]}>Eliminar</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  main: {
    gap: 4,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
  },
  pressed: { opacity: 0.9 },
  type: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.mutedText,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    fontSize: 12,
    color: colors.mutedText,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  actionBtn: {
    minHeight: layout.minTouchTarget - 8,
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  delete: {
    color: colors.danger,
  },
});
