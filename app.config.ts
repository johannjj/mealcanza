import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: '¿Me alcanza?',
  slug: 'hipoteca-chile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'hipotecachile',
  newArchEnabled: false,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#0F3D4C',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.johannmorales.hipotecachile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0F3D4C',
    },
    package: 'com.johannmorales.hipotecachile',
    versionCode: 1,
    permissions: [],
    /** Evita que el teclado oculte el header al calcular */
    softwareKeyboardLayoutMode: 'pan',
  },
  plugins: ['expo-router', 'expo-secure-store'],
  experiments: {
    typedRoutes: true,
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
    name: '¿Me alcanza?',
    shortName: '¿Me alcanza?',
    description:
      'Simula créditos hipotecarios, refinanciamiento, capacidad de pago y renta necesaria usando la UF actual.',
    themeColor: '#0F3D4C',
    backgroundColor: '#F5F7FA',
    lang: 'es-CL',
  },
  extra: {
    eas: {
      projectId: 'REPLACE_WITH_EAS_PROJECT_ID',
    },
  },
});
