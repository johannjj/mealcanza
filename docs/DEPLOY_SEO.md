# Despliegue web (AWS Amplify) y SEO

La web de **¿Me alcanza?** se exporta como sitio estático con Expo Router (`web.output: "static"`). No es una SPA de un solo `index.html`: cada ruta pública genera su propio HTML en `dist/`.

## Variables de entorno

| Variable | Valor provisional | Uso |
|----------|-------------------|-----|
| `SITE_URL` | `https://mealcanza.cl` | Canonical, sitemap, robots, OG |
| `EXPO_PUBLIC_SITE_URL` | igual que `SITE_URL` | Disponible en el cliente Expo |
| `EXPO_PUBLIC_GOOGLE_SITE_VERIFICATION` | (opcional) | Meta de verificación Search Console |

Centralizado en `src/config/site.ts`. Cambiar el dominio = actualizar la variable en Amplify (o el default en ese archivo).

## Build local

```bash
npm ci
npm run build:production   # generate-seo-files + expo export + seo:check
npm run web:serve          # sirve dist/ en http://localhost:3000
```

Scripts:

- `web:build` — genera `public/robots.txt`, `public/sitemap.xml` y exporta a `dist/`
- `seo:check` — valida HTML, titles, descriptions, canonicals, sitemap
- `web:serve` — prueba el HTML estático (no uses solo `expo start --web` para validar SEO)

## Amplify

Archivo: `amplify.yml`

1. Conectar el repositorio.
2. Definir `SITE_URL=https://mealcanza.cl` (y `EXPO_PUBLIC_SITE_URL` igual).
3. Artifact: `dist`.
4. Dominio personalizado `mealcanza.cl` (+ `www` → apex o viceversa).
5. Importar redirects desde `public/_redirects.json` (o copiarlas en la consola Amplify).

### Redirects importantes

- Rutas legacy EN → ES (`/mortgage` → `/vivienda/simular-credito`, etc.) — **301**
- `www` → apex (o la convención elegida)
- HTTP → HTTPS (Amplify suele hacerlo al activar el dominio)
- Dominio temporal `*.amplifyapp.com` → `https://mealcanza.cl` (regla host en Amplify)

### No usar rewrite SPA global

**No** configures `/<*>` → `/index.html` si quieres servir el HTML estático por ruta. Eso anularía el SSG.

Para 404: servir `404.html` con estado 404 (ver `_redirects.json`). Expo export suele emitir `404.html` desde `+not-found.tsx`.

### Caché

- HTML / `robots.txt` / `sitemap.xml`: revalidación corta (`max-age=0, must-revalidate`)
- Assets hasheados (`_expo/**`, `assets/**`): `immutable` largo

## Google Search Console

1. Crear propiedad de **dominio** `mealcanza.cl` (o prefijo URL).
2. Verificar por DNS (recomendado) o meta/`EXPO_PUBLIC_GOOGLE_SITE_VERIFICATION`, o archivo HTML en `public/`.
3. Enviar sitemap: `https://mealcanza.cl/sitemap.xml`
4. Inspeccionar URLs clave (`/`, calculadoras, artículos).
5. Comprobar cobertura / páginas indexadas.
6. Revisar Core Web Vitals (Experience).
7. Revisar errores de rastreo.

No indexar simulaciones personales ni `/lead` (ya va con `noindex`).

## Checklist post-deploy

- [ ] `https://mealcanza.cl/robots.txt` apunta al sitemap absoluto
- [ ] Sitemap solo con HTTPS canónicos
- [ ] Cada ruta pública tiene title, description, canonical propios
- [ ] OG image carga: `/og/mealcanza-cover.png`
- [ ] Legacy `/mortgage` responde 301
- [ ] URL inexistente → 404 (no 200 al Home)
