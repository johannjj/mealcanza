import { appConfig } from '@/config/appConfig';
import { clearUfCache, getCurrentUf } from '@/services/ufService';

describe('getCurrentUf', () => {
  beforeEach(() => {
    clearUfCache();
    global.fetch = jest.fn();
  });

  it('obtiene UF desde mindicador', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        serie: [{ fecha: '2024-06-01T04:00:00.000Z', valor: 38_123.45 }],
      }),
    });

    const uf = await getCurrentUf();
    expect(uf.value).toBe(38_123.45);
    expect(uf.source).toBe('mindicador');
  });

  it('usa fallback si falla la API', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network'));

    const uf = await getCurrentUf();
    expect(uf.value).toBe(appConfig.fallbackUfValue);
    expect(uf.source).toBe('fallback');
  });
});
