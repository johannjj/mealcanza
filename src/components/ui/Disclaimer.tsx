import { StyleSheet, Text } from 'react-native';
import { colors, spacing } from '@/theme';

type Props = {
  text: string;
};

export function Disclaimer({ text }: Props) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: colors.mutedText,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
});
