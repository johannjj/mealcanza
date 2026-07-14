import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { AnalyticsRouteTracker } from '@/components/analytics/AnalyticsRouteTracker';
import { HeaderBackButton } from '@/navigation/HeaderBackButton';
import { services } from '@/services/container';
import { colors } from '@/theme';

/**
 * Métricas iniciales para SSR / export estático web.
 * Evita useLayoutEffect async de SafeAreaProvider en el servidor.
 */
const ssrSafeAreaMetrics = initialWindowMetrics ?? {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export default function RootLayout() {
  useEffect(() => {
    void services.userRepository.getAnonymousUserId();
  }, []);

  return (
    <SafeAreaProvider initialMetrics={ssrSafeAreaMetrics}>
      <AnalyticsRouteTracker />
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackVisible: false,
          headerLeft: () => <HeaderBackButton />,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: '600', color: colors.text },
          headerShadowVisible: true,
          gestureEnabled: true,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="vivienda/index" options={{ headerShown: false }} />
        <Stack.Screen name="vivienda/simular-credito" options={{ headerShown: false }} />
        <Stack.Screen name="vivienda/refinanciar" options={{ headerShown: false }} />
        <Stack.Screen name="vivienda/capacidad-de-pago" options={{ headerShown: false }} />
        <Stack.Screen name="vivienda/cuanto-deberia-ganar" options={{ headerShown: false }} />
        <Stack.Screen name="aprende/index" options={{ headerShown: false }} />
        <Stack.Screen name="aprende/que-es-la-uf" options={{ headerShown: false }} />
        <Stack.Screen name="aprende/carga-financiera" options={{ headerShown: false }} />
        <Stack.Screen
          name="aprende/cuando-conviene-refinanciar"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="privacidad" options={{ headerShown: false }} />
        <Stack.Screen name="terminos" options={{ headerShown: false }} />
        <Stack.Screen name="contacto" options={{ headerShown: false }} />
        <Stack.Screen name="mortgage" options={{ headerShown: false }} />
        <Stack.Screen name="refinance" options={{ headerShown: false }} />
        <Stack.Screen name="affordability" options={{ headerShown: false }} />
        <Stack.Screen name="income-required" options={{ headerShown: false }} />
        <Stack.Screen
          name="lead"
          options={{ title: 'Solicitar orientación', headerShown: true }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
