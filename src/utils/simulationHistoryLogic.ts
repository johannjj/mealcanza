import {
  SIMULATION_HISTORY_MAX_PER_TYPE,
  SIMULATION_HISTORY_STORAGE_VERSION,
  type SimulationHistoryEntry,
  type SimulationHistoryType,
} from '@/types/simulationHistory';

type StoredHistory = {
  version: number;
  entries: SimulationHistoryEntry[];
};

export function serializeHistory(entries: SimulationHistoryEntry[]): string {
  const payload: StoredHistory = {
    version: SIMULATION_HISTORY_STORAGE_VERSION,
    entries,
  };
  return JSON.stringify(payload);
}

export function deserializeHistory(raw: string | null): SimulationHistoryEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredHistory;
    if (!parsed || !Array.isArray(parsed.entries)) return [];
    return parsed.entries.filter(isValidEntry);
  } catch {
    return [];
  }
}

function isValidEntry(entry: unknown): entry is SimulationHistoryEntry {
  if (!entry || typeof entry !== 'object') return false;
  const e = entry as SimulationHistoryEntry;
  return (
    typeof e.id === 'string' &&
    typeof e.type === 'string' &&
    typeof e.createdAt === 'string' &&
    typeof e.primaryResultLabel === 'string' &&
    typeof e.primaryResultValue === 'string' &&
    typeof e.route === 'string' &&
    e.params !== null &&
    typeof e.params === 'object'
  );
}

/** Aplica el límite de N entradas por tipo (más recientes primero). */
export function enforceHistoryLimit(
  entries: SimulationHistoryEntry[],
  maxPerType: number = SIMULATION_HISTORY_MAX_PER_TYPE,
): SimulationHistoryEntry[] {
  const byType = new Map<SimulationHistoryType, SimulationHistoryEntry[]>();
  for (const entry of entries) {
    const list = byType.get(entry.type) ?? [];
    list.push(entry);
    byType.set(entry.type, list);
  }

  const result: SimulationHistoryEntry[] = [];
  for (const list of byType.values()) {
    const sorted = [...list].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    result.push(...sorted.slice(0, maxPerType));
  }

  return result.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
