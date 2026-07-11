# Analítica y privacidad — ¿Me alcanza?

## Principio

La analítica futura debe ser **mínima y no invasiva**. En el MVP actual se usa `NoopAnalyticsRepository`: no se envía ningún evento a servidores externos.

## Interfaz

`AnalyticsRepository` expone:

- `trackPageView`
- `trackCalculatorStarted`
- `trackCalculatorCompleted`
- `trackResultShared`
- `trackRelatedCalculatorOpened`

## Qué SÍ puede enviarse (futuro)

- Nombre de pantalla
- Tipo de calculadora (`mortgage`, `refinance`, `affordability`, `income-required`)
- Nombre del evento
- Plataforma (`android`, `web`, `ios`)
- Timestamp agregado por el proveedor

## Qué NO debe enviarse

- Renta líquida
- Deudas u otros créditos
- Valor de propiedad, pie o monto financiado
- Resultados financieros exactos (dividendo, ahorro, índice)
- Nombre, email, teléfono, RUT
- Ubicación
- Identificadores personales o del dispositivo usados para tracking cross-site

## Historial local

El historial de simulaciones se guarda solo en el dispositivo (`AsyncStorage`). No forma parte de la analítica y no se transmite.

## Compartir

Compartir usa la API nativa del sistema. El contenido del mensaje lo controla la app y evita datos sensibles (renta, deudas, gastos fijos).
