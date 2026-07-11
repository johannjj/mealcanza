import { z } from 'zod';

const positiveNumber = z.coerce.number().min(0, 'Debe ser un valor válido');
const positiveStrict = z.coerce.number().positive('Debe ser mayor a 0');
const percent = z.coerce.number().min(0).max(100, 'La tasa debe estar entre 0 y 100');
const termYears = z.coerce.number().min(1).max(40, 'Plazo entre 1 y 40 años');

const mortgageTermYears = z.coerce
  .number()
  .min(5, 'Plazo mínimo 5 años')
  .max(40, 'Plazo máximo 40 años');

const annualRateStrict = z.coerce
  .number()
  .positive('La tasa anual debe ser mayor a 0')
  .max(100, 'La tasa debe estar entre 0 y 100');

const ufPropertySchema = z.object({
  propertyValueUf: positiveStrict,
  downPaymentUf: positiveNumber,
  annualRatePercent: annualRateStrict,
  termYears: mortgageTermYears,
});

export const mortgageFormFieldsSchema = ufPropertySchema.extend({
  netMonthlyIncome: positiveStrict,
  otherMonthlyCredits: positiveNumber,
});

export const incomeRequiredFormSchema = ufPropertySchema
  .refine((data) => data.downPaymentUf <= data.propertyValueUf, {
    message: 'El pie no puede superar el valor de la propiedad',
    path: ['downPaymentUf'],
  })
  .refine((data) => data.downPaymentUf < data.propertyValueUf, {
    message: 'El pie debe ser menor al valor de la propiedad para financiar',
    path: ['downPaymentUf'],
  });

/** Valida pie en UF contra valor propiedad en UF. */
export function createMortgageFormSchema(_ufValue: number) {
  return mortgageFormFieldsSchema
    .refine((data) => data.downPaymentUf <= data.propertyValueUf, {
      message: 'El pie no puede superar el valor de la propiedad',
      path: ['downPaymentUf'],
    })
    .refine((data) => data.downPaymentUf < data.propertyValueUf, {
      message: 'El pie debe ser menor al valor de la propiedad para financiar',
      path: ['downPaymentUf'],
    });
}

export type MortgageFormValues = z.infer<typeof mortgageFormFieldsSchema>;
export type IncomeRequiredFormValues = z.infer<typeof incomeRequiredFormSchema>;

export const refinanceFormSchema = z.object({
  currentBalance: positiveStrict,
  currentMonthlyPayment: positiveStrict,
  currentRatePercent: percent,
  newRatePercent: percent,
  remainingTermYears: termYears,
  refinanceCost: positiveNumber,
});

export const affordabilityFormSchema = z.object({
  netSalary: positiveStrict,
  currentHousingCost: positiveNumber,
  monthlyCredits: positiveNumber,
  fixedExpenses: positiveNumber,
  dependents: z.coerce.number().min(0).max(20, 'Máximo 20 cargas'),
});

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  commune: z.string().min(2, 'Ingresa tu comuna'),
  objective: z.enum(['comprar', 'refinanciar', 'evaluar']),
  comment: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar ser contactado' }),
  }),
});

export type RefinanceFormValues = z.infer<typeof refinanceFormSchema>;
export type AffordabilityFormValues = z.infer<typeof affordabilityFormSchema>;
export type LeadFormValues = z.infer<typeof leadFormSchema>;
