import { parseDecimalInput } from '@/utils/numericInput';

/** Convierte monto UF a CLP usando valor UF del día. */
export function ufToClp(ufAmount: number, ufValue: number): number {
  return ufAmount * ufValue;
}

/** Formatea cantidad en UF (hasta 2 decimales). */
export function formatUF(ufAmount: number): string {
  if (!Number.isFinite(ufAmount)) return '0 UF';
  const formatted = ufAmount.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${formatted} UF`;
}

/** @deprecated Usar parseDecimalInput — reexport por compatibilidad. */
export function parseUfInput(text: string): number {
  return parseDecimalInput(text);
}
