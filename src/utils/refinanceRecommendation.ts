export type RefinanceAttractiveness = 'evaluate' | 'intermediate' | 'unattractive';

export type RefinanceRecommendation = {
  attractiveness: RefinanceAttractiveness;
  title: string;
  message: string;
};

/**
 * Diagnóstico referencial de refinanciamiento.
 * No afirma “te conviene refinanciar”.
 */
export function getRefinanceRecommendation(params: {
  monthlySavings: number;
  monthsToRecoverCost: number | null;
}): RefinanceRecommendation {
  const { monthlySavings, monthsToRecoverCost } = params;

  if (monthlySavings <= 0) {
    return {
      attractiveness: 'unattractive',
      title: 'Poco atractivo',
      message:
        'Con estos datos no aparece un ahorro mensual claro. Revisa tasas, costos y plazo antes de avanzar.',
    };
  }

  if (monthsToRecoverCost === null) {
    return {
      attractiveness: 'unattractive',
      title: 'Poco atractivo',
      message:
        'No fue posible estimar la recuperación del costo. Valida los números con tu institución financiera.',
    };
  }

  if (monthsToRecoverCost <= 24) {
    return {
      attractiveness: 'evaluate',
      title: 'Conviene evaluar',
      message:
        'Este escenario podría ser interesante para evaluar: el costo se recuperaría en hasta 24 meses y hay ahorro mensual positivo.',
    };
  }

  if (monthsToRecoverCost <= 48) {
    return {
      attractiveness: 'intermediate',
      title: 'Resultado intermedio',
      message:
        'El ahorro existe, pero la recuperación del costo tomaría entre 25 y 48 meses. Compara costos reales antes de decidir.',
    };
  }

  return {
    attractiveness: 'unattractive',
    title: 'Poco atractivo',
    message:
      'La recuperación del costo supera los 48 meses o el ahorro es bajo frente al esfuerzo. Este escenario parece poco atractivo a primera vista.',
  };
}
