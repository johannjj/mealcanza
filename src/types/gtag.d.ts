export {};

type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFunction;
    __MEALCANZA_GA_INITIALIZED__?: boolean;
  }
}
