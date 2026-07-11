# Notas de privacidad — Hipoteca Chile (MVP)

> **Importante:** Este documento es orientación interna. Antes de publicar en Google Play debes redactar y publicar una **política de privacidad** legal revisada por un profesional.

## Estado actual (MVP)

- **No hay login** ni registro de usuario.
- **No se envían datos** a servidores propios ni de terceros en esta versión.
- Las **solicitudes de orientación (leads)** se guardan **solo en el dispositivo** (AsyncStorage) como mock local.
- Se genera un **ID anónimo local** (`anonymousUserId`) con `expo-secure-store` / AsyncStorage para uso futuro de analytics o correlación local. No se transmite.
- **No hay publicidad real** ni SDKs de ads (AdMob, etc.) en el MVP.
- **Analytics:** implementación `NoopAnalyticsRepository` — no registra eventos en servicios externos.

## Datos que la app puede almacenar localmente

| Dato | Ubicación | Propósito |
|------|-----------|-----------|
| `anonymousUserId` | SecureStore / AsyncStorage | Identificador anónimo futuro |
| Leads del formulario | AsyncStorage | Mock hasta activar backend |

## Permisos Android

El MVP declara **permisos mínimos** (lista vacía en `app.config.ts`). No solicita ubicación, contactos, cámara ni notificaciones.

## Si activas backend en el futuro

Deberás actualizar:

1. Política de privacidad pública (URL en Play Console).
2. Formulario **Data Safety** de Google Play (qué datos recoges, si se comparten, cifrado, etc.).
3. Reemplazar `LocalLeadRepository` por `ApiLeadRepository` y documentar retención/borrado de datos.
4. Consentimiento explícito ya capturado en el formulario de leads — mantener registro de aceptación en servidor.

## Si activas publicidad o analytics

- Actualizar política de privacidad y Data Safety.
- No usar tracking invasivo sin consentimiento donde la ley lo exija.
- Los componentes en `src/features/ads/` están preparados para sponsors directos (`SponsorAd`), no AdMob en MVP.

## Texto base sugerido para política de privacidad (borrador)

```
Hipoteca Chile es una herramienta de simulación referencial. En la versión actual no 
requiere crear cuenta. Los cálculos se realizan en tu dispositivo. Si envías una 
solicitud de orientación, los datos se almacenan localmente hasta que habilitemos 
un servicio de contacto; en ese caso te informaremos antes de transmitir información 
a servidores externos.

No vendemos tus datos personales. Para consultas: [tu email de contacto].
```

**Debe ser revisado** antes de publicar.
