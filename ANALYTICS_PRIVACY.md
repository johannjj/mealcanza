# Analítica y privacidad — ¿Me alcanza?

## Principio

La analítica debe ser **mínima y no invasiva**.

| Plataforma | Implementación |
|------------|----------------|
| Web (producción `mealcanza.cl`) | `GoogleAnalyticsRepository` (GA4) si hay `EXPO_PUBLIC_GA_MEASUREMENT_ID` |
| Android / iOS / Expo Go | `NoopAnalyticsRepository` (sin red) |
| Tests / sin ID | `NoopAnalyticsRepository` |
| Localhost | No envía eventos reales (solo log si `EXPO_PUBLIC_GA_DEBUG=true`) |

## Variables de entorno

```bash
EXPO_PUBLIC_GA_MEASUREMENT_ID=G-FT4PQW3ZYW
EXPO_PUBLIC_GA_DEBUG=true          # opcional: log en consola (dev)
EXPO_PUBLIC_GA_ALLOW_LOCALHOST=true # opcional: permitir envío real desde localhost
```

### AWS Amplify

1. Amplify → aplicación → **Variables de entorno**
2. Agregar `EXPO_PUBLIC_GA_MEASUREMENT_ID` = `G-FT4PQW3ZYW`
3. Nuevo deploy (`amplify.yml` / `build:production`)

El Measurement ID es público (va en el bundle web). No es un secreto.

## Arquitectura

- `src/services/analytics/googleAnalytics.ts` — gtag.js, page_view, events
- `src/repositories/GoogleAnalyticsRepository.ts` — puente al `AnalyticsRepository`
- `src/components/analytics/AnalyticsRouteTracker.tsx` — page views de Expo Router (una sola vez en `_layout`)
- `send_page_view: false` en config GA para evitar duplicados con el tracker

## Eventos permitidos

| Evento | Parámetros |
|--------|------------|
| `page_view` | `page_path`, `page_location`, `page_title` |
| `calculator_started` | `calculator_type` |
| `calculator_completed` | `calculator_type`, `result_status?` |
| `result_shared` | `calculator_type`, `share_method` |
| `related_calculator_opened` | `source_calculator`, `target_calculator` |
| `history_opened` | `calculator_type` |

`calculator_type`: `mortgage` \| `refinance` \| `affordability` \| `income_required`  
`result_status`: `comfortable` \| `reasonable` \| `tight` \| `risky`  
`share_method`: `native` \| `web`

## Qué NO se envía

- Renta, deudas, valor propiedad, pie, tasa
- Resultados financieros exactos (dividendo, ahorro, índice numérico)
- Nombre, email, teléfono, RUT, comuna
- Identificadores locales / anonymous user id
- Query strings de Expo Router (`__EXPO_ROUTER_key`, etc.)

## Consent Mode (TODO)

No hay banner de cookies todavía. Si más adelante se habilitan publicidad, remarketing o cookies no esenciales, implementar **Google Consent Mode v2** antes de tags de marketing, y actualizar esta política + UI de consentimiento.

## Validación en producción

1. Deploy con la variable en Amplify
2. Abrir https://mealcanza.cl en incógnito
3. GA4 → Informes → Tiempo real → usuario activo
4. Navegar Home → Vivienda → Simular crédito → Aprende (un `page_view` por ruta)
5. Completar simulación → `calculator_completed`
6. Consola del navegador sin errores de Analytics
