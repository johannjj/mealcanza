import { Button } from '@/components/ui/Button';
import { shareCopy } from '@/constants/copy';

type Props = {
  onPress: () => void;
  label?: string;
};

export function ShareResultButton({
  onPress,
  label = shareCopy.shareResult,
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
