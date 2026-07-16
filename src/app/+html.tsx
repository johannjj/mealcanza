import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * HTML raíz solo para export estático web (no se ejecuta en nativo).
 * @see https://docs.expo.dev/router/web/static-rendering/
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="es-CL">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/image/icon.png" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #F5F7FA;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #F5F7FA;
  }
}
`;
