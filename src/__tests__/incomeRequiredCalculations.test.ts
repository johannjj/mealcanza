import {
  buildIncomeRequiredAnalysis,
  getIncomeDiagnostic,
  compareIncomeByPie,
  compareIncomeByTerm,
} from '@/utils/incomeRequiredCalculations';

const baseInput = {
  propertyValueUf: 3500,
  downPaymentUf: 700,
  annualRatePercent: 5.5,
  termYears: 25,
  ufValue: 40_600,
  loadPercent: 30,
};

describe('calculateRequiredIncome', () => {
  it('estima renta según carga financiera 30%', () => {
    const result = buildIncomeRequiredAnalysis(baseInput);
    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeGreaterThan(0);
    expect(result!.requiredIncome).toBeCloseTo(result!.monthlyPayment / 0.3, 0);
  });

  it('incluye comparadores de pie y plazo', () => {
    const result = buildIncomeRequiredAnalysis(baseInput)!;
    expect(result.pieScenarios.length).toBe(3);
    expect(result.termScenarios.length).toBe(3);
    expect(result.pieScenarios[0]!.requiredIncome).toBeGreaterThan(
      result.pieScenarios[2]!.requiredIncome,
    );
  });
});

describe('getIncomeDiagnostic', () => {
  it('clasifica por tramos de renta', () => {
    expect(getIncomeDiagnostic(1_200_000)).toContain('ingresos medios');
    expect(getIncomeDiagnostic(2_000_000)).toContain('promedio nacional');
    expect(getIncomeDiagnostic(4_000_000)).toContain('exigente');
    expect(getIncomeDiagnostic(6_000_000)).toContain('alto ingreso');
  });
});

describe('compareIncomeByTerm', () => {
  it('a mayor plazo menor dividendo y renta', () => {
    const rows = compareIncomeByTerm(baseInput);
    expect(rows[0]!.termYears).toBe(20);
    expect(rows[0]!.monthlyPayment).toBeGreaterThan(rows[2]!.monthlyPayment);
    expect(rows[0]!.requiredIncome).toBeGreaterThan(rows[2]!.requiredIncome);
  });
});

describe('compareIncomeByPie', () => {
  it('a mayor pie menor renta requerida', () => {
    const rows = compareIncomeByPie(baseInput);
    expect(rows[2]!.requiredIncome).toBeLessThan(rows[0]!.requiredIncome);
  });
});
