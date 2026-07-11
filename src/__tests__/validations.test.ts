import {
  createMortgageFormSchema,
  incomeRequiredFormSchema,
  leadFormSchema,
} from '@/utils/validations';

describe('createMortgageFormSchema', () => {
  const schema = createMortgageFormSchema(40_600);

  it('rechaza pie mayor o igual a propiedad en UF', () => {
    const result = schema.safeParse({
      propertyValueUf: 2500,
      downPaymentUf: 2500,
      annualRatePercent: 5,
      termYears: 20,
      netMonthlyIncome: 1_500_000,
      otherMonthlyCredits: 0,
    });
    expect(result.success).toBe(false);
  });

  it('acepta datos válidos', () => {
    const result = schema.safeParse({
      propertyValueUf: 2500,
      downPaymentUf: 500,
      annualRatePercent: 5.5,
      termYears: 25,
      netMonthlyIncome: 2_000_000,
      otherMonthlyCredits: 150_000,
    });
    expect(result.success).toBe(true);
  });
});

describe('incomeRequiredFormSchema', () => {
  it('acepta propiedad y pie en UF', () => {
    const result = incomeRequiredFormSchema.safeParse({
      propertyValueUf: 3000,
      downPaymentUf: 600,
      annualRatePercent: 5.5,
      termYears: 20,
    });
    expect(result.success).toBe(true);
  });
});

describe('leadFormSchema', () => {
  it('requiere consentimiento', () => {
    const result = leadFormSchema.safeParse({
      name: 'Juan',
      email: 'juan@test.com',
      commune: 'Santiago',
      objective: 'comprar',
      consent: false,
    });
    expect(result.success).toBe(false);
  });
});
