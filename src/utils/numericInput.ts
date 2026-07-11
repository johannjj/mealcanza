/**
 * Utilidades para inputs numéricos: valor interno = number, formato solo visual.
 * Decimales: el usuario puede escribir con punto "." (y también coma "," estilo CL).
 */

/** Formato chileno con separador de miles (sin decimales). */
export function formatThousandsCL(value: number, maxDecimals = 0): string {
  if (!Number.isFinite(value) || value <= 0) return '';
  return value.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

/** Presentación con miles (.) y decimal con punto: ej. 2500.5 → "2.500.5" */
export function formatDecimalWithDot(value: number, maxDecimals = 2): string {
  if (!Number.isFinite(value) || value <= 0) return '';

  const rounded = Math.round(value * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
  const [intPart, decPart] = rounded.toFixed(maxDecimals).split('.');
  const intFormatted = Number(intPart).toLocaleString('es-CL', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  if (!decPart || Number(decPart) === 0) {
    return intFormatted;
  }

  const trimmedDec = decPart.replace(/0+$/, '');
  return trimmedDec ? `${intFormatted}.${trimmedDec}` : intFormatted;
}

/** Texto mientras se edita: punto como decimal, sin separar miles. */
export function formatDecimalEditing(value: number, maxDecimals = 2): string {
  if (!Number.isFinite(value) || value <= 0) return '';
  const rounded = Math.round(value * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
  const str = rounded.toFixed(maxDecimals);
  return str.replace(/\.?0+$/, '') || str;
}

/** Enteros (plazo, cargas): solo dígitos. */
export function parseIntegerInput(text: string): number {
  const digits = text.replace(/\D/g, '');
  if (!digits) return 0;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Parsea decimales permitiendo:
 * - "5.5" / "5." (punto decimal)
 * - "2.500" (punto como miles)
 * - "2.500,5" / "5,5" (formato chileno)
 */
export function parseDecimalInput(text: string): number {
  const trimmed = text.replace(/\s/g, '').trim();
  if (!trimmed) return 0;

  if (trimmed.includes(',')) {
    const normalized = trimmed.replace(/\./g, '').replace(',', '.');
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (!trimmed.includes('.')) {
    const parsed = Number.parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const parts = trimmed.split('.');
  const last = parts[parts.length - 1] ?? '';

  if (last === '') {
    const intOnly = parts.slice(0, -1).join('');
    const parsed = Number.parseFloat(intOnly);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (parts.length === 2) {
    const before = parts[0] ?? '';
    const after = parts[1] ?? '';
    if (after.length <= 2) {
      const parsed = Number.parseFloat(`${before}.${after}`);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    const parsed = Number.parseFloat(`${before}${after}`);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (last.length <= 2) {
    const intPart = parts.slice(0, -1).join('');
    const parsed = Number.parseFloat(`${intPart}.${last}`);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const parsed = Number.parseFloat(trimmed.replace(/\./g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Permite solo dígitos y un separador decimal (punto o coma). */
export function sanitizeDecimalTyping(text: string): string {
  let result = '';
  let hasSeparator = false;

  for (const char of text) {
    if (char >= '0' && char <= '9') {
      result += char;
    } else if ((char === '.' || char === ',') && !hasSeparator) {
      result += '.';
      hasSeparator = true;
    }
  }

  return result;
}
