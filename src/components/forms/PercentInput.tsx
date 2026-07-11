import { DecimalInput } from './DecimalInput';

type Props = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

/** Tasas (%): decimal con punto. */
export function PercentInput({ value, onChange, placeholder }: Props) {
  return (
    <DecimalInput
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? '0'}
      maxDecimals={2}
    />
  );
}
