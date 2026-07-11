export type LeadObjective = 'comprar' | 'refinanciar' | 'evaluar';

export type Lead = {
  id: string;
  anonymousUserId: string;
  name: string;
  email: string;
  phone?: string;
  commune: string;
  objective: LeadObjective;
  comment?: string;
  consent: boolean;
  createdAt: string;
};
