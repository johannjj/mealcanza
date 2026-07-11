import { appConfig } from '@/config/appConfig';
import {
  buildAffordabilityShareMessage,
  buildIncomeRequiredShareMessage,
  buildMortgageShareMessage,
  buildRefinanceShareMessage,
} from '@/services/shareResultService';

describe('shareResultService messages', () => {
  const originalAppUrl = appConfig.appUrl;
  const originalDownload = appConfig.appDownloadUrl;

  afterEach(() => {
    (appConfig as { appUrl: string }).appUrl = originalAppUrl;
    (appConfig as { appDownloadUrl: string }).appDownloadUrl = originalDownload;
  });

  it('mortgage no incluye renta ni otros créditos', () => {
    (appConfig as { appUrl: string }).appUrl = 'https://example.com';
    const message = buildMortgageShareMessage({
      monthlyPayment: 450_000,
      propertyValueUf: 2500,
    });
    expect(message).toContain('2.500 UF');
    expect(message).toContain('450.000');
    expect(message).toContain('https://example.com');
    expect(message).not.toMatch(/renta|créditos|deuda|sueldo/i);
  });

  it('refinance menciona ahorro sin datos sensibles', () => {
    (appConfig as { appUrl: string }).appUrl = '';
    (appConfig as { appDownloadUrl: string }).appDownloadUrl = '';
    const message = buildRefinanceShareMessage({ monthlySavings: 80_000 });
    expect(message).toContain('80.000');
    expect(message).toContain('Disponible próximamente');
    expect(message).not.toMatch(/saldo|tasa|renta/i);
  });

  it('affordability no incluye dividendo ni renta', () => {
    const message = buildAffordabilityShareMessage({ maxRecommendedDividend: 350_000 });
    expect(message).toContain('capacidad de pago');
    expect(message).not.toContain('350.000');
    expect(message).not.toMatch(/sueldo|renta|email|teléfono/i);
  });

  it('income-required incluye renta estimada y propiedad', () => {
    const message = buildIncomeRequiredShareMessage({
      requiredIncome: 2_000_000,
      propertyValueUf: 3000,
    });
    expect(message).toContain('3.000 UF');
    expect(message).toContain('2.000.000');
  });
});
