# ¿Me alcanza?

Suite de calculadoras financieras para Chile. **Módulo Vivienda** funcional: simular crédito, refinanciamiento, capacidad de pago y renta necesaria. MVP sin backend, sin login.

## Arquitectura (suite)

```
src/
├── app/                    # Rutas expo-router
├── modules/
│   ├── suite/              # Home y UI de la suite
│   ├── housing/            # Módulo vivienda (activo)
│   ├── car/placeholder/
│   ├── family/placeholder/
│   ├── savings/placeholder/
│   └── retirement/placeholder/
├── config/modules.ts       # Configuración de módulos
├── components/             # UI compartida
├── features/               # Implementación legacy (→ housing)
└── utils/                  # Cálculos
```

## Diseño (mobile first)

La interfaz prioriza **Android** y se adapta a tablet y escritorio sin convertirse en un sitio web tradicional:

| Viewport | Comportamiento |
|----------|----------------|
| Móvil (&lt; 768px) | 1 columna, botones táctiles grandes, cards apiladas |
| Tablet (768–1023px) | 2 columnas donde aporta (ej. herramientas del Home) |
| Desktop (≥ 1024px) | Contenido centrado, máximo **1200px** de ancho |

Misma experiencia en móvil y web: no se ocultan funcionalidades en pantallas pequeñas. Componentes base: `ScreenLayout`, `ContentContainer`, `ResponsiveColumns`, hook `useResponsive()`.

## Características (MVP)

- Simulador de crédito hipotecario (sistema francés)
- Simulador de refinanciamiento
- Evaluación de capacidad de pago
- Formulario de orientación (guardado local mock)
- ID anónimo local para tracking futuro
- Placeholders de publicidad (`adsEnabled: false`)
- Disclaimers financieros visibles

## Requisitos

- Node.js 18+ (recomendado 20 LTS)
- npm o yarn
- [Expo Go](https://expo.dev/go) en el teléfono (pruebas rápidas)
- Cuenta [Expo](https://expo.dev) para builds EAS (producción)

## Instalación

**Obligatorio antes de cualquier comando** (si no, verás `Cannot find package 'expo'` o `jest: not found`):

```bash
cd ~/repos/hipotecario
npm install
npx expo install --fix   # alinea paquetes Expo (expo-asset, expo-font, etc.)
```

> No uses `npx expo start` sin haber ejecutado `npm install` antes: `npx` puede instalar Expo CLI 56 en caché, distinto del SDK 52 del proyecto. Usa `npm start` (usa el `expo` local de `node_modules`).

## Desarrollo local

```bash
npm start
# equivalente: npx expo start   (solo después de npm install)
```

- Escanea el QR con **Expo Go** (Android).
- O presiona `a` para emulador Android si está configurado.

### Otros comandos

```bash
npm run lint          # ESLint
npm run format        # Prettier
npm run typecheck     # TypeScript
npm run test          # Tests unitarios (Jest)
```

## Web estática (SEO / Amplify)

La web se exporta con HTML por ruta (`web.output: "static"`). Dominio provisional: `https://mealcanza.cl` (`SITE_URL` / `EXPO_PUBLIC_SITE_URL` en `src/config/site.ts`).

```bash
npm run build:production   # export + validación SEO
npm run web:serve          # servir dist/ localmente
npm run seo:check          # solo validar dist/
```

Guía completa: [docs/DEPLOY_SEO.md](docs/DEPLOY_SEO.md) (Amplify, redirects 301, Search Console, caché).

## Probar en Expo Go (recomendado)

Esta app está pensada para **Android**. La forma más simple de probarla:

1. Misma red Wi‑Fi en PC y teléfono.
2. `npm start` → escanea el **QR** con **Expo Go** (Android).
3. Probar las herramientas desde Home: crédito, refinanciamiento, capacidad de pago, ¿cuánto debería ganar?

> No pulses `w` (web) hasta tener instalado `react-native-web` (incluido en `package.json`; ejecuta `npm install` tras actualizar el repo).

### Probar en navegador (opcional)

Requiere dependencias web:

```bash
npm install
npx expo install react-native-web react-dom @expo/metro-runtime
npm run web
```

Si ves `Unable to resolve "react-native-web"` o error 500 en el bundle, faltan esos paquetes — vuelve a ejecutar los comandos de arriba.

> Expo Go en el teléfono debe ser compatible con **SDK 52**. Si es más antiguo, actualiza Expo Go desde Play Store.

## Build Android con EAS

### Primera vez

```bash
npm install -g eas-cli
eas login
eas build:configure
```

Edita `app.config.ts` → `extra.eas.projectId` con el ID que entrega Expo.

### Build producción (AAB para Google Play)

```bash
eas build --platform android --profile production
```

Descarga el **AAB** desde el dashboard de Expo y súbelo a Play Console.

### Perfil preview (APK interno)

```bash
eas build --platform android --profile preview
```

## Publicación en Google Play — checklist

- [ ] Ícono y adaptive icon (`assets/`)
- [ ] Splash screen alineado a marca
- [ ] Screenshots (teléfono, mínimo 2)
- [ ] Política de privacidad (URL pública) — ver `PRIVACY_NOTES.md`
- [ ] Data Safety Form completado en Play Console
- [ ] Disclaimers en ficha y dentro de la app
- [ ] Cuenta Google Play Console ($25 one‑time)
- [ ] Pruebas internas / cerradas antes de producción
- [ ] Revisar permisos declarados (MVP: mínimos)
- [ ] `version` y `versionCode` actualizados en `app.config.ts`
- [ ] Package: `com.johannmorales.hipotecachile`

## Configuración relevante

| Archivo | Uso |
|---------|-----|
| `app.config.ts` | Nombre, slug, package Android, splash |
| `src/constants/config.ts` | `adsEnabled`, URLs futuras |
| `src/services/container.ts` | Cambiar repos local → API |
| `eas.json` | Perfiles de build |

## Arquitectura

Ver [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Privacidad

Ver [PRIVACY_NOTES.md](PRIVACY_NOTES.md).

## Estructura del proyecto

```
src/
├── app/              # expo-router
├── components/
├── features/
├── repositories/
├── services/
├── storage/
├── theme/
├── utils/
├── types/
└── constants/
```

## Activar publicidad o backend (futuro)

1. **Leads API:** `ApiLeadRepository` en `container.ts`.
2. **Ads:** `adsEnabled: true` + datos en `StaticSponsorRepository` o API.
3. **Analytics:** reemplazar `NoopAnalyticsRepository`.

## Licencia

Proyecto privado — definir licencia según tu uso.
