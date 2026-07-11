import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { storageKeys } from './keys';

function generateId(): string {
  return `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * ID anónimo persistente para analytics/tracking local futuro.
 * Intenta SecureStore primero; fallback AsyncStorage.
 */
export async function getOrCreateAnonymousUserId(): Promise<string> {
  try {
    const secure = await SecureStore.getItemAsync(storageKeys.anonymousUserId);
    if (secure) return secure;

    const fromAsync = await AsyncStorage.getItem(storageKeys.anonymousUserId);
    if (fromAsync) {
      await SecureStore.setItemAsync(storageKeys.anonymousUserId, fromAsync);
      return fromAsync;
    }

    const newId = generateId();
    await SecureStore.setItemAsync(storageKeys.anonymousUserId, newId);
    await AsyncStorage.setItem(storageKeys.anonymousUserId, newId);
    return newId;
  } catch {
    const fromAsync = await AsyncStorage.getItem(storageKeys.anonymousUserId);
    if (fromAsync) return fromAsync;

    const newId = generateId();
    await AsyncStorage.setItem(storageKeys.anonymousUserId, newId);
    return newId;
  }
}
