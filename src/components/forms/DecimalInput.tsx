import { useEffect, useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { colors } from '@/theme';
import {
  formatDecimalEditing,
  formatDecimalWithDot,
  parseDecimalInput,
  sanitizeDecimalTyping,
} from '@/utils/numericInput';
import { numericInputStyles } from './numericInputStyles';

type Props = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  maxDecimals?: number;
};

/**
 * Input decimal: permite escribir con punto "." sin perderlo al tipear (ej. "5.").
 * Al salir del campo aplica formato visual con miles y punto decimal.
 */
export function DecimalInput({ value, onChange, placeholder, maxDecimals = 2 }: Props) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setText(value > 0 ? formatDecimalWithDot(value, maxDecimals) : '');
    }
  }, [value, focused, maxDecimals]);

  const handleChangeText = (raw: string) => {
    const sanitized = sanitizeDecimalTyping(raw.replace(/,/g, '.'));
    setText(sanitized);
    onChange(parseDecimalInput(sanitized));
  };

  const handleFocus: TextInputProps['onFocus'] = () => {
    setFocused(true);
    setText(value > 0 ? formatDecimalEditing(value, maxDecimals) : '');
  };

  const handleBlur: TextInputProps['onBlur'] = () => {
    setFocused(false);
    setText(value > 0 ? formatDecimalWithDot(value, maxDecimals) : '');
  };

  return (
    <TextInput
      style={numericInputStyles.input}
      keyboardType="decimal-pad"
      placeholder={placeholder ?? '0'}
      placeholderTextColor={colors.mutedText}
      value={text}
      onChangeText={handleChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
