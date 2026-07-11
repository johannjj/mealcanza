import { parseDecimalInput } from '@/utils/numericInput';

const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

/** Formatea un número como pesos chilenos (CLP). Solo presentación. */
export function formatCLP(value: number): string {
  if (!Number.isFinite(value)) return '$0';
  return clpFormatter.format(Math.round(value));
}

/** Parsea entrada CLP: ignora $ y separadores, guarda entero. */
export function parseCLPInput(text: string): number {
  const digits = text.replace(/\D/g, '');
  if (!digits) return 0;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Formatea porcentaje con hasta 2 decimales. */
export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '0%';
  return `${value.toFixed(2).replace(/\.?0+$/, '')}%`;
}

/** @deprecated Usar parseDecimalInput — reexport por compatibilidad. */
export function parsePercentInput(text: string): number {
  return parseDecimalInput(text);
}
