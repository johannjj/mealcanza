import type { Lead } from '@/types/lead';

export type CreateLeadInput = Omit<Lead, 'id' | 'createdAt'>;

export interface LeadRepository {
  saveLead(input: CreateLeadInput): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
}

/**
 * Implementación futura (API REST):
 *
 * export class ApiLeadRepository implements LeadRepository {
 *   constructor(private baseUrl: string, private apiKey?: string) {}
 *   async saveLead(input: CreateLeadInput): Promise<Lead> {
 *     const res = await fetch(`${this.baseUrl}/leads`, { method: 'POST', body: JSON.stringify(input) });
 *     if (!res.ok) throw new Error('Error al enviar solicitud');
 *     return res.json();
 *   }
 * }
 */
