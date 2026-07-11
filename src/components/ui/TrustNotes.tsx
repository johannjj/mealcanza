import { StyleSheet, Text, View } from 'react-native';
import { legalCopy } from '@/constants/copy';
import { colors, spacing } from '@/theme';

const notes = [
  legalCopy.calculationReference,
  legalCopy.noAccountNeeded,
  legalCopy.noServerStorage,
  legalCopy.noUnnecessaryPermissions,
];

export function TrustNotes() {
  return (
    <View style={styles.container}>
      {notes.map((note) => (
        <Text key={note} style={styles.note}>
          · {note}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  note: {
    fontSize: 12,
    color: colors.mutedText,
  },
});
