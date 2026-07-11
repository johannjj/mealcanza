import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '@/storage/keys';
import type { SimulationHistoryEntry } from '@/types/simulationHistory';
import {
  deserializeHistory,
  enforceHistoryLimit,
  serializeHistory,
} from '@/utils/simulationHistoryLogic';

export {
  deserializeHistory,
  enforceHistoryLimit,
  serializeHistory,
} from '@/utils/simulationHistoryLogic';

function createId(): string {
  return `sim_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function loadSimulationHistory(): Promise<SimulationHistoryEntry[]> {
  const raw = await AsyncStorage.getItem(storageKeys.simulationHistory);
  return deserializeHistory(raw);
}

export async function saveSimulationHistory(
  entries: SimulationHistoryEntry[],
): Promise<void> {
  const limited = enforceHistoryLimit(entries);
  await AsyncStorage.setItem(storageKeys.simulationHistory, serializeHistory(limited));
}

export async function addSimulationHistoryEntry(
  entry: Omit<SimulationHistoryEntry, 'id' | 'createdAt'> & {
    id?: string;
    createdAt?: string;
  },
): Promise<SimulationHistoryEntry> {
  const full: SimulationHistoryEntry = {
    ...entry,
    id: entry.id ?? createId(),
    createdAt: entry.createdAt ?? new Date().toISOString(),
  };
  const current = await loadSimulationHistory();
  const next = enforceHistoryLimit([full, ...current]);
  await saveSimulationHistory(next);
  return full;
}

export async function removeSimulationHistoryEntry(id: string): Promise<void> {
  const current = await loadSimulationHistory();
  await saveSimulationHistory(current.filter((e) => e.id !== id));
}

export async function clearSimulationHistory(): Promise<void> {
  await AsyncStorage.removeItem(storageKeys.simulationHistory);
}
