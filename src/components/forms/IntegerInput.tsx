import { TextInput } from 'react-native';
import { colors } from '@/theme';
import { parseIntegerInput } from '@/utils/numericInput';
import { numericInputStyles } from './numericInputStyles';

type Props = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

/** Enteros (años, cargas): teclado numérico, sin decimales. */
export function IntegerInput({ value, onChange, placeholder }: Props) {
  const display = value > 0 ? String(value) : '';

  return (
    <TextInput
      style={numericInputStyles.input}
      keyboardType="numeric"
      placeholder={placeholder ?? '0'}
      placeholderTextColor={colors.mutedText}
      value={display}
      onChangeText={(text) => onChange(parseIntegerInput(text))}
    />
  );
}
