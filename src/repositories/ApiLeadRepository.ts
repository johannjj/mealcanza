import type { Lead } from '@/types/lead';
import type { CreateLeadInput, LeadRepository } from './LeadRepository';

/**
 * Stub para backend futuro. No se usa en MVP.
 * Reemplazar LocalLeadRepository por esta clase cuando exista API.
 */
export class ApiLeadRepository implements LeadRepository {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey?: string,
  ) {}

  async getLeads(): Promise<Lead[]> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.apiKey) headers.Authorization = `Bearer ${this.apiKey}`;

    const res = await fetch(`${this.baseUrl}/leads`, { headers });
    if (!res.ok) throw new Error('No se pudieron obtener las solicitudes');
    return res.json() as Promise<Lead[]>;
  }

  async saveLead(input: CreateLeadInput): Promise<Lead> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.apiKey) headers.Authorization = `Bearer ${this.apiKey}`;

    const res = await fetch(`${this.baseUrl}/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error('No se pudo enviar la solicitud');
    return res.json() as Promise<Lead>;
  }
}
