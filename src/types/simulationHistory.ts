import type { AffordabilityScoreStatus } from '@/utils/affordabilityScore';
import type { HousingRoute } from '@/types/modules';

export type SimulationHistoryType =
  | 'mortgage'
  | 'refinance'
  | 'affordability'
  | 'income-required';

export type SimulationHistoryEntry = {
  id: string;
  type: SimulationHistoryType;
  createdAt: string;
  /** Texto corto del resultado principal, ej. "$450.000" */
  primaryResultLabel: string;
  primaryResultValue: string;
  statusLabel?: string;
  status?: AffordabilityScoreStatus;
  ufValue?: number;
  formulaVersion?: string;
  /** Parámetros mínimos para reabrir (sin datos personales) */
  params: Record<string, number | string>;
  route: HousingRoute;
};

export const SIMULATION_HISTORY_MAX_PER_TYPE = 10;
export const SIMULATION_HISTORY_STORAGE_VERSION = 1;
