import { formatCLP, parseCLPInput } from '@/utils/currency';
import {
  formatDecimalWithDot,
  parseDecimalInput,
  parseIntegerInput,
  sanitizeDecimalTyping,
} from '@/utils/numericInput';

describe('parseCLPInput / formatCLP', () => {
  it('guarda número interno y formatea con $ y miles', () => {
    const internal = parseCLPInput('120000000');
    expect(internal).toBe(120_000_000);
    expect(formatCLP(internal)).toBe('$120.000.000');
  });

  it('parsea desde texto ya formateado', () => {
    expect(parseCLPInput('$120.000.000')).toBe(120_000_000);
  });
});

describe('parseDecimalInput', () => {
  it('acepta punto como decimal', () => {
    expect(parseDecimalInput('5.5')).toBe(5.5);
    expect(parseDecimalInput('5.')).toBe(5);
    expect(parseDecimalInput('2500.5')).toBe(2500.5);
  });

  it('parsea UF y tasas con formato chileno (coma)', () => {
    expect(parseDecimalInput('2.500,5')).toBe(2500.5);
    expect(parseDecimalInput('5,5')).toBe(5.5);
  });

  it('punto como separador de miles', () => {
    expect(parseDecimalInput('2.500')).toBe(2500);
  });
});

describe('sanitizeDecimalTyping', () => {
  it('normaliza coma a punto y un solo separador', () => {
    expect(sanitizeDecimalTyping('5,5')).toBe('5.5');
    expect(sanitizeDecimalTyping('5..5')).toBe('5.5');
  });
});

describe('formatDecimalWithDot', () => {
  it('muestra decimal con punto', () => {
    expect(formatDecimalWithDot(2500.5)).toBe('2.500.5');
    expect(formatDecimalWithDot(5.5)).toBe('5.5');
  });
});

describe('parseIntegerInput', () => {
  it('solo dígitos enteros', () => {
    expect(parseIntegerInput('20')).toBe(20);
    expect(parseIntegerInput('20a')).toBe(20);
  });
});
