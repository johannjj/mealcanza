import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Lead } from '@/types/lead';
import { storageKeys } from '@/storage/keys';
import type { CreateLeadInput, LeadRepository } from './LeadRepository';

export class LocalLeadRepository implements LeadRepository {
  async getLeads(): Promise<Lead[]> {
    const raw = await AsyncStorage.getItem(storageKeys.leads);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as Lead[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async saveLead(input: CreateLeadInput): Promise<Lead> {
    const leads = await this.getLeads();
    const lead: Lead = {
      ...input,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    leads.push(lead);
    await AsyncStorage.setItem(storageKeys.leads, JSON.stringify(leads));
    return lead;
  }
}
