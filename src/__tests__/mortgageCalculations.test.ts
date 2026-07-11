import {
  calculateFrenchMonthlyPayment,
  calculateFinancialLoadPercent,
  getFinancialLoadStatus,
  simulateMortgage,
} from '@/utils/mortgageCalculations';

describe('calculateFrenchMonthlyPayment', () => {
  it('calcula dividendo con tasa positiva', () => {
    const payment = calculateFrenchMonthlyPayment(80_000_000, 5.5, 20);
    expect(payment).not.toBeNull();
    expect(payment!).toBeGreaterThan(500_000);
  });

  it('maneja tasa 0 como cuota lineal', () => {
    const payment = calculateFrenchMonthlyPayment(12_000_000, 0, 10);
    expect(payment).toBe(100_000);
  });

  it('retorna null con principal inválido', () => {
    expect(calculateFrenchMonthlyPayment(0, 5, 20)).toBeNull();
  });
});

describe('calculateFinancialLoadPercent', () => {
  it('calcula carga sobre renta', () => {
    expect(calculateFinancialLoadPercent(400_000, 100_000, 2_000_000)).toBe(25);
  });

  it('retorna null si renta es 0', () => {
    expect(calculateFinancialLoadPercent(400_000, 0, 0)).toBeNull();
  });
});

describe('getFinancialLoadStatus', () => {
  it('clasifica estados', () => {
    expect(getFinancialLoadStatus(20)).toBe('reasonable');
    expect(getFinancialLoadStatus(30)).toBe('adjusted');
    expect(getFinancialLoadStatus(40)).toBe('risky');
  });
});

describe('simulateMortgage', () => {
  it('simula crédito en UF convertido a CLP', () => {
    const ufValue = 40_600;
    const result = simulateMortgage({
      propertyValueUf: 2500,
      downPaymentUf: 500,
      ufValue,
      annualRatePercent: 5.5,
      termYears: 20,
      netMonthlyIncome: 2_500_000,
      otherMonthlyCredits: 0,
    });
    expect(result).not.toBeNull();
    expect(result!.propertyValueClp).toBe(2500 * ufValue);
    expect(result!.principal).toBe(2000 * ufValue);
    expect(result!.principalUf).toBeCloseTo(2000, 2);
    expect(result!.monthlyPayment).toBeGreaterThan(0);
  });
});
