import { Button } from '@/components/ui/Button';
import { simulatorCopy } from '@/constants/copy';

type Props = {
  onPress: () => void;
  label?: string;
};

export function EditCalculationButton({
  onPress,
  label = simulatorCopy.editSimulation,
}: Props) {
  return (
    <Button
      label={label}
      variant="outline"
      onPress={onPress}
      accessibilityLabel={label}
    />
  );
}
