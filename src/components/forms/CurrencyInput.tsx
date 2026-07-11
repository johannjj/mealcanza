import { TextInput } from 'react-native';
import { colors } from '@/theme';
import { formatCLP, parseCLPInput } from '@/utils/currency';
import { numericInputStyles } from './numericInputStyles';

type Props = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

/** Montos en CLP: teclado numérico, visualización con $ y separador de miles. */
export function CurrencyInput({ value, onChange, placeholder }: Props) {
  return (
    <TextInput
      style={numericInputStyles.input}
      keyboardType="numeric"
      placeholder={placeholder ?? '$0'}
      placeholderTextColor={colors.mutedText}
      value={value > 0 ? formatCLP(value) : ''}
      onChangeText={(text) => onChange(parseCLPInput(text))}
    />
  );
}
