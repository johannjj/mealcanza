import {
  getLoadConsumptionText,
  getMortgageDiagnosticMessage,
  getMortgageRecommendationMessage,
} from '@/utils/mortgageResultMessaging';

describe('mortgageResultMessaging', () => {
  it('devuelve diagnóstico y recomendación por estado del índice', () => {
    expect(getMortgageDiagnosticMessage('comfortable')).toContain('saludable');
    expect(getMortgageDiagnosticMessage('adjusted')).toContain('margen');
    expect(getMortgageDiagnosticMessage('risky')).toContain('alta');
    expect(getMortgageRecommendationMessage('comfortable')).toContain('emergencia');
  });

  it('formatea texto de consumo de renta', () => {
    expect(getLoadConsumptionText(30)).toContain('30%');
    expect(getLoadConsumptionText(30)).toContain('renta líquida');
  });
});
