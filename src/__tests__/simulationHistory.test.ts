import {
  deserializeHistory,
  enforceHistoryLimit,
  serializeHistory,
} from '@/utils/simulationHistoryLogic';
import type { SimulationHistoryEntry } from '@/types/simulationHistory';
import { routes } from '@/navigation/routes';

function makeEntry(
  overrides: Partial<SimulationHistoryEntry> & Pick<SimulationHistoryEntry, 'id' | 'type'>,
): SimulationHistoryEntry {
  return {
    createdAt: overrides.createdAt ?? new Date().toISOString(),
    primaryResultLabel: 'Dividendo',
    primaryResultValue: '$100.000',
    route: routes.mortgage,
    params: { propertyValueUf: 3000 },
    ...overrides,
  };
}

describe('simulationHistoryLogic', () => {
  it('serializa y deserializa historial', () => {
    const entries = [
      makeEntry({ id: 'a', type: 'mortgage', createdAt: '2026-01-02T00:00:00.000Z' }),
    ];
    const raw = serializeHistory(entries);
    expect(deserializeHistory(raw)).toHaveLength(1);
    expect(deserializeHistory(raw)[0]?.id).toBe('a');
  });

  it('limita a 10 por tipo y prioriza recientes', () => {
    const entries = Array.from({ length: 12 }, (_, i) =>
      makeEntry({
        id: `m${i}`,
        type: 'mortgage',
        createdAt: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
      }),
    );
    const limited = enforceHistoryLimit(entries, 10);
    expect(limited).toHaveLength(10);
    expect(limited[0]?.id).toBe('m11');
    expect(limited.some((e) => e.id === 'm0')).toBe(false);
  });

  it('maneja JSON inválido', () => {
    expect(deserializeHistory('not-json')).toEqual([]);
    expect(deserializeHistory(null)).toEqual([]);
  });
});
