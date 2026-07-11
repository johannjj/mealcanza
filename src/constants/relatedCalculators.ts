import type { CalculatorAnalyticsType } from '@/repositories/AnalyticsRepository';
import type { HousingRoute } from '@/types/modules';
import { routes } from '@/navigation/routes';

export type RelatedCalculator = {
  id: CalculatorAnalyticsType;
  title: string;
  description: string;
  route: HousingRoute;
};

const catalog: Record<CalculatorAnalyticsType, RelatedCalculator> = {
  mortgage: {
    id: 'mortgage',
    title: 'Simular crédito',
    description: 'Estima el dividendo con propiedad, pie, tasa y plazo.',
    route: routes.mortgage,
  },
  refinance: {
    id: 'refinance',
    title: 'Refinanciamiento',
    description: 'Compara si una nueva tasa podría bajar tu dividendo.',
    route: routes.refinance,
  },
  affordability: {
    id: 'affordability',
    title: 'Capacidad de pago',
    description: 'Evalúa cuánto podrías destinar mensualmente a vivienda.',
    route: routes.affordability,
  },
  'income-required': {
    id: 'income-required',
    title: '¿Cuánto debería ganar?',
    description: 'Comprueba qué renta sería recomendable para este escenario.',
    route: routes.incomeRequired,
  },
};

const relatedMap: Record<CalculatorAnalyticsType, CalculatorAnalyticsType[]> = {
  mortgage: ['income-required', 'affordability'],
  refinance: ['affordability', 'mortgage'],
  affordability: ['mortgage', 'income-required'],
  'income-required': ['mortgage', 'affordability'],
};

const descriptions: Record<string, string> = {
  'mortgage>income-required':
    'Comprueba qué renta sería recomendable para este mismo escenario.',
  'mortgage>affordability':
    'Revisa cuánto margen mensual tendrías con tu renta y gastos.',
  'refinance>affordability': 'Compara mi capacidad de pago con el nuevo dividendo estimado.',
  'refinance>mortgage': 'Simula un crédito nuevo con otras condiciones.',
  'affordability>mortgage': 'Ver qué propiedad podrías financiar con este margen.',
  'affordability>income-required':
    'Estima la renta necesaria si ya tienes una propiedad en mente.',
  'income-required>mortgage': 'Simular este crédito con los mismos datos de propiedad.',
  'income-required>affordability':
    'Contrasta la renta estimada con tu capacidad de pago real.',
};

export function getRelatedCalculators(
  from: CalculatorAnalyticsType,
): RelatedCalculator[] {
  return relatedMap[from].map((id) => {
    const base = catalog[id];
    const key = `${from}>${id}`;
    return {
      ...base,
      description: descriptions[key] ?? base.description,
    };
  });
}
