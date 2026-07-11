# Arquitectura — Hipoteca Chile

## Stack

- **Expo SDK 52** + React Native + TypeScript estricto
- **expo-router** (navegación file-based en `src/app/`)
- **react-hook-form** + **zod** para formularios
- **AsyncStorage** / **expo-secure-store** para persistencia local

## Estructura de carpetas

```
src/
├── app/                 # Rutas expo-router
├── components/          # UI reutilizable (Button, Card, inputs)
├── features/            # Pantallas por dominio
│   ├── home/
│   ├── mortgage/
│   ├── refinance/
│   ├── affordability/
│   ├── leads/
│   └── ads/
├── navigation/          # Constantes de rutas
├── repositories/        # Contratos + implementaciones local/API
├── services/            # Contenedor de dependencias (DI simple)
├── storage/             # Claves y anonymous user id
├── theme/               # Colores y espaciado
├── utils/               # Cálculos y validaciones (testeables)
├── types/
└── constants/           # config, textos legales
```

## Capas

| Capa | Responsabilidad |
|------|-----------------|
| `src/app/*` | Enrutamiento, sin lógica de negocio |
| `src/features/*` | Pantallas y composición UI |
| `src/utils/*` | Fórmulas financieras puras |
| `src/repositories/*` | Acceso a datos (local o API futura) |

## Extensión futura sin rehacer arquitectura

### Backend / leads

En `src/services/container.ts`:

```ts
// leadRepository: new ApiLeadRepository('https://api.tudominio.cl', API_KEY),
```

### Publicidad

1. Cambiar `adsEnabled: true` en `src/constants/config.ts`.
2. Opcional: `ApiSponsorRepository` que implemente `SponsorRepository`.
3. Usar `SponsoredBanner` con datos reales; mantener sin AdMob hasta definir política de privacidad.

### Analytics

Reemplazar `NoopAnalyticsRepository` por implementación que envíe eventos (con consentimiento si aplica).

## Compartir resultados

- `src/services/shareService.ts` — Share API nativa (`react-native`), sin SDK de WhatsApp.
- Mensajes solo con datos no sensibles; enlace desde `appConfig.appDownloadUrl`.

## UF (simulador hipotecario)

- `src/services/ufService.ts` — UF desde [mindicador.cl](https://mindicador.cl/api/uf), cache en memoria 1 h.
- Fallback: `src/config/appConfig.ts` → `fallbackUfValue`.
- Propiedad en **UF**; pie, renta, créditos y dividendo en **CLP**.

## Cálculos

- **Crédito:** convierte UF→CLP, luego cuotas **francesas** (`mortgageCalculations.ts`).
- **Carga financiera:** `(dividendo + otros créditos) / renta × 100`.
- **Estados:** ≤25% razonable, ≤35% ajustado, >35% riesgoso.
- **Refinanciamiento:** nuevo dividendo con nueva tasa + meses de recuperación del costo.
- **Capacidad de pago:** disponible mensual, dividendo máx. 25% del disponible, rango de propiedad con tasas por defecto en `config.ts`.

## Tests

`npm run test` — Jest en `src/__tests__/`.
