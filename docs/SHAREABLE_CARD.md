# Tarjeta visual compartible — fase 2

## Estado actual (fase 1)

- Componente visual: `ShareableResultCard`
- Compartir funcional: texto vía `Share` de React Native (`shareResultService`)
- Vista previa de la tarjeta en pantallas de resultado

## Captura como imagen (pendiente)

Para generar una imagen desde la tarjeta sin romper Expo Managed Workflow, evaluar:

| Opción | Notas |
|--------|--------|
| `react-native-view-shot` | Compatible con Expo Dev Client / prebuild; **no** siempre con Expo Go puro según versión |
| `expo-sharing` + archivo temporal | Complementa el share de archivo |
| HTML Canvas (solo web) | No unifica Android/web |

**Decisión fase 1:** no añadir dependencia pesada. Mantener share de texto + tarjeta visual preparada.

## TODO fase 2

1. Confirmar compatibilidad de `react-native-view-shot` con el SDK Expo del proyecto.
2. Capturar `ShareableResultCard` a PNG en Android.
3. En web, fallback a share de texto o `navigator.share` con archivo si el navegador lo permite.
4. No incluir renta ni deudas en la imagen.
