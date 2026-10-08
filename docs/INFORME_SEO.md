# Informe SEO — Me Alcanza

Fecha: 7 de octubre de 2026  
Sitio: https://mealcanza.cl  
Alcance: fase de optimización orgánica del simulador hipotecario y del SEO técnico existente. No incluye despliegue.

El sitio no es Next.js. Es **Expo 52 con Expo Router 4** y exportación web estática (`web.output: "static"`). Cada ruta pública genera su propio HTML.

## Auditoría

Search Console, últimos 6 meses: **801 impresiones**, **7 clics**, CTR **0,9 %**, posición media **35,9**. Sin campañas. El CTR es el esperado en la página 4. El margen está en subir las consultas que ya impresionan, sobre todo el simulador hipotecario.

Consultas principales: simulador credito hipotecario (30), calcular credito hipotecario (20), simulador de credito hipotecario (17), simulador hipotecario (16), simular credito hipotecario (14), simulador hipoteca (13), que significa uf (12), que es uf (12), refinanciar credito hipotecario (10).

### Lo que ya estaba bien

- HTML estático por ruta, con `lang="es-CL"`.
- Title, description, canonical, Open Graph y Twitter Cards por página.
- `robots.txt` y `sitemap.xml` en `https://mealcanza.cl`, sin rutas legacy ni `/lead`.
- Redirects 301 de `/mortgage`, `/refinance`, `/affordability` e `/income-required`.
- H1 real en el HTML (React Native Web lo emite como `<h1>`).
- Contenido del simulador en el HTML inicial, debajo del formulario.
- GA4 con `anonymize_ip`, sin renta, pie, tasa ni resultados.
- Sin fuentes web propias. El bundle JS exportado pesa **2,43 MB**.

### Problemas encontrados

- Los títulos usaban «¿Me alcanza?». En la SERP el signo de interrogación compite con la consulta y no coincide con `mealcanza.cl`.
- El simulador no explicaba en la misma página qué es el dividendo, cómo entra la UF ni cómo pesan tasa y plazo.
- El JSON-LD existía en el código, pero no salía en el HTML. Helmet solo publica un `<script>` si el JSON va como texto hijo, no con `dangerouslySetInnerHTML`.
- Las guías de UF y refinanciamiento existían, con títulos más débiles que las consultas «que es uf», «que significa uf» y «refinanciar credito hipotecario».
- No hay guía propia de «cómo calcular un crédito hipotecario» ni de «cuánto pie necesito».

## Priorización

| Mejora | Impacto SEO | Esfuerzo | Riesgo | Estado |
|---|---|---|---|---|
| Títulos y descriptions alineados a las consultas | Alto | Bajo | Bajo | Hecho |
| Contenido del simulador (dividendo, UF, tasa, plazo, FAQ) | Alto | Bajo | Bajo | Hecho |
| JSON-LD real en el HTML | Medio | Bajo | Bajo | Hecho |
| Títulos de UF y refinanciamiento | Medio | Bajo | Bajo | Hecho |
| Enlace interno simulador → refinanciar y UF | Medio | Bajo | Bajo | Hecho |
| `alt` del logo | Bajo | Bajo | Bajo | Hecho |
| Páginas nuevas de cálculo y de pie | Medio | Medio | Bajo | Pendiente de aprobación |
| Reducir el bundle de 2,43 MB | Medio en CWV | Alto | Alto | No tocado |
| Eventos `calculation_*` | Medición | Bajo | Duplicaría GA | No creados |

## Qué cambió

### Metadatos

Archivo: `src/constants/seo.ts`.

Título y description únicos por página, en español de Chile, dentro de 60 y 160 caracteres. El simulador quedó así:

- Title: `Simulador de Crédito Hipotecario Chile | Me Alcanza` (51 caracteres)
- Description: `Simula tu crédito hipotecario en Chile. Estima el dividendo mensual, el pie, la tasa y el costo total con la UF del día. Gratis y referencial.` (142 caracteres)

La marca visible de la app sigue siendo «¿Me alcanza?». En la SERP y en los datos estructurados se usa «Me Alcanza», con «¿Me alcanza?» como nombre alternativo.

### Simulador

Archivos: `src/features/mortgage/MortgageSimulatorScreen.tsx`, `src/constants/calculatorSeoContent.ts`.

El H1 sigue siendo «Simulador de crédito hipotecario en Chile». La intro aclara que el resultado es referencial. Debajo del formulario hay secciones sobre el dividendo, la UF, la tasa y el plazo, más dos preguntas frecuentes con el mismo texto visible. Enlaces a la UF, a refinanciar, a carga financiera y a renta necesaria.

### Refinanciamiento

H1 visible: «Refinanciar un crédito hipotecario».  
Title: `Refinanciar crédito hipotecario en Chile | Me Alcanza`.

### Guías ya existentes

- H1 de UF: «¿Qué es la UF en Chile?»
- H1 de refinanciar: «¿Cuándo conviene refinanciar un crédito hipotecario?»

### Datos estructurados

Archivos: `src/components/seo/jsonLd.ts`, `src/components/seo/SeoHead.tsx`.

En el HTML exportado:

- Home: `WebSite` y `Organization`.
- Simulador y refinanciar: `WebApplication`, `BreadcrumbList` y `FAQPage`.
- Artículo de UF: `Article` y `BreadcrumbList`.

Sin valoraciones, precios inventados ni ofertas. `WebApplication` marca la herramienta como gratuita (`isAccessibleForFree`).

### Técnico

- `og:image:alt` y `twitter:image:alt`.
- Prioridad de sitemap 0,7 para `/aprende/que-es-la-uf` y `/aprende/cuando-conviene-refinanciar`.
- `alt` en el logo del header y del hero.
- El chequeo SEO avisa si un title pasa de 60 caracteres o una description de 160.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/constants/seo.ts` | Titles y descriptions |
| `src/components/seo/SeoHead.tsx` | JSON-LD como texto del script; alt de la imagen social; `og:site_name` |
| `src/components/seo/jsonLd.ts` | `WebSite`, `Organization` y `WebApplication` |
| `src/constants/calculatorSeoContent.ts` | Texto, FAQ y enlaces del simulador |
| `src/features/mortgage/MortgageSimulatorScreen.tsx` | Intro del simulador |
| `src/features/refinance/RefinanceSimulatorScreen.tsx` | H1 de refinanciar |
| `src/constants/education.ts` | H1 y fecha visible de UF y refinanciar |
| `src/config/modules.ts` | Títulos de las tarjetas de esas guías |
| `src/constants/copy.ts` | Ancla del footer: «Cuándo refinanciar» |
| `src/config/indexableRoutes.ts` | Prioridad 0,7 de esas dos guías |
| `scripts/seo.config.mjs` | Misma prioridad en el generador del sitemap |
| `scripts/check-seo.mjs` | Aviso de longitud de title y description |
| `src/components/layout/SiteHeader.tsx` | `alt` del logo |
| `src/modules/suite/components/HeroIllustration.tsx` | `alt` del logo |
| `src/repositories/GoogleAnalyticsRepository.ts` | Comentario de equivalencia de eventos, sin eventos nuevos |
| `public/sitemap.xml` | Regenerado en el build; esas dos guías quedan en prioridad 0,7 |

No se tocaron fórmulas, el diseño ni la configuración de Amplify.

## Pruebas

| Comando | Resultado |
|---|---|
| `npm run typecheck` | Pasó |
| `npm run lint` | 0 errores. Siguen avisos de Prettier que ya estaban |
| `npm run build:production` | Pasó. 13 URLs en el sitemap, 20 rutas estáticas |
| `npm run seo:check` | OK, 13 rutas, 0 avisos |

Se revisó el HTML exportado, no una sesión en el navegador completando el formulario. El simulador, la UF y refinanciar traen title, description, canonical, H1 y JSON-LD en el primer HTML.

## Analytics

No se agregaron `calculation_started` ni `calculation_completed`. Ya se envían, sin datos financieros:

| Nombre pedido | Evento existente | Cuándo |
|---|---|---|
| `calculation_started` | `calculator_started` | Al abrir la calculadora |
| `calculation_completed` | `calculator_completed` | Al obtener un resultado. En hipoteca incluye `result_status` categórico |
| `result_shared` | `result_shared` | Al compartir, con `share_method` `web` o `native` |

`calculator_started` cuenta una vista de la pantalla, no el primer campo editado.

## Páginas nuevas, sin implementar

1. **Qué es la UF.** Ya está en `/aprende/que-es-la-uf`. Solo se ajustó el título.
2. **Cómo calcular un crédito hipotecario.** No existe. Propuesta: `/aprende/como-calcular-credito-hipotecario`, con H1, sistema francés, pie, tasa, plazo, UF y un ejemplo, más enlace al simulador. Sin calculadora nueva.
3. **Cuánto pie necesito.** No existe. Propuesta: `/aprende/cuanto-pie-necesito`, con el 10 % y el 20 % habituales en Chile, qué baja el pie en el dividendo y qué no cubre (gastos operacionales). Enlace al simulador y a renta necesaria.
4. **Cuándo refinanciar.** Ya está en `/aprende/cuando-conviene-refinanciar`. Solo se ajustó el título.

Las propuestas 2 y 3 quedan pendientes de aprobación antes de implementarlas. Si se aprueban, entran al sitemap y al índice de Aprende.

## Search Console, después del despliegue

- [ ] Publicar este build. Este cambio no se desplegó.
- [ ] Abrir `https://mealcanza.cl/robots.txt` y confirmar `Sitemap: https://mealcanza.cl/sitemap.xml`.
- [ ] Enviar o volver a procesar el sitemap.
- [ ] Inspeccionar y solicitar indexación de:
  - `https://mealcanza.cl/vivienda/simular-credito`
  - `https://mealcanza.cl/vivienda/refinanciar`
  - `https://mealcanza.cl/aprende/que-es-la-uf`
  - `https://mealcanza.cl/aprende/cuando-conviene-refinanciar`
- [ ] En la URL inspeccionada, comprobar title, description, canonical y que el HTML ve el H1.
- [ ] Probar el resultado enriquecido de FAQ y de `WebApplication` en la prueba de resultados enriquecidos de Google.
- [ ] Confirmar que `/mortgage` responde 301 a `/vivienda/simular-credito`.
- [ ] En GA4 en tiempo real: un `page_view` por ruta, `calculator_completed` al simular y `result_shared` al compartir. Sin montos ni renta en los parámetros.
- [ ] Revisar rendimiento de esas cuatro URLs a los 14 y 28 días. La posición 35 no se mueve el mismo día del despliegue.

## Pendiente consciente

El bundle de 2,43 MB y la falta de medición de Core Web Vitals en laboratorio. No hay cifra de Lighthouse de esta pasada.
