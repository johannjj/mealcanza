import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/theme';

/**
 * Botón atrás visible en el header (Stack nativo a veces no lo muestra en Android/Expo Go).
 * Si hay historial → atrás; si no → inicio.
 */
export function HeaderBackButton() {
  const router = useRouter();

  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.button}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="Volver al inicio"
    >
      <Ionicons
        name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
        size={Platform.OS === 'ios' ? 28 : 24}
        color={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
