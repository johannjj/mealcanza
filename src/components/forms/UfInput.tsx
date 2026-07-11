import { DecimalInput } from './DecimalInput';

type Props = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

/** Montos en UF: decimal con punto, miles al perder foco. */
export function UfInput({ value, onChange, placeholder }: Props) {
  return (
    <DecimalInput
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? '0'}
      maxDecimals={2}
    />
  );
}
