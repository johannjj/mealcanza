import { Alert, Platform, Share } from 'react-native';
import { appConfig } from '@/config/appConfig';
import { suiteCopy } from '@/constants/copy';
import { formatCLP } from '@/utils/currency';
import { formatUF } from '@/utils/uf';

const APP_NAME = suiteCopy.appName;

/** Línea de enlace para mensajes compartidos. Prioriza appUrl, luego appDownloadUrl. */
export function getShareAppLinkLine(): string {
  const appUrl = appConfig.appUrl.trim();
  if (appUrl) return appUrl;
  const download = appConfig.appDownloadUrl.trim();
  if (download) return download;
  return 'Disponible próximamente.';
}

function isShareCancelled(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const message =
    'message' in error && typeof error.message === 'string' ? error.message : '';
  const normalized = message.toLowerCase();
  return (
    normalized.includes('cancel') ||
    normalized.includes('dismiss') ||
    normalized.includes('did not share')
  );
}

export async function shareTextResult(message: string): Promise<boolean> {
  try {
    const outcome = await Share.share({ message });
    if (outcome.action === Share.dismissedAction) {
      return false;
    }
    return true;
  } catch (error) {
    if (isShareCancelled(error)) {
      return false;
    }
    Alert.alert('No se pudo compartir', 'Intenta nuevamente en unos momentos.');
    return false;
  }
}

/**
 * Mensajes sin renta, otros créditos ni gastos fijos.
 * No incluir datos personales.
 */
export function buildMortgageShareMessage(params: {
  monthlyPayment: number;
  propertyValueUf: number;
}): string {
  const link = getShareAppLinkLine();
  return (
    `Simulé una propiedad de ${formatUF(params.propertyValueUf)} en ${APP_NAME}. ` +
    `El dividendo estimado es ${formatCLP(params.monthlyPayment)} mensuales. ` +
    `Cálculo referencial. Prueba la herramienta en ${link}`
  );
}

export function buildRefinanceShareMessage(params: { monthlySavings: number }): string {
  const link = getShareAppLinkLine();
  return (
    `Según mi simulación en ${APP_NAME}, un refinanciamiento podría reducir el dividendo ` +
    `en aproximadamente ${formatCLP(params.monthlySavings)} mensuales. ` +
    `Cálculo referencial. ${link}`
  );
}

export function buildAffordabilityShareMessage(_params?: {
  maxRecommendedDividend?: number;
}): string {
  const link = getShareAppLinkLine();
  return (
    `Evalué mi capacidad de pago en ${APP_NAME}. ` +
    `Puedes hacer tu propia simulación aquí: ${link}`
  );
}

export function buildIncomeRequiredShareMessage(params: {
  requiredIncome: number;
  propertyValueUf: number;
}): string {
  const link = getShareAppLinkLine();
  return (
    `Para una propiedad de ${formatUF(params.propertyValueUf)}, ` +
    `la renta estimada necesaria sería aproximadamente ${formatCLP(params.requiredIncome)} líquidos. ` +
    `Cálculo referencial. ${link}`
  );
}

export async function shareMortgageResult(params: {
  monthlyPayment: number;
  propertyValueUf: number;
}): Promise<boolean> {
  return shareTextResult(buildMortgageShareMessage(params));
}

export async function shareRefinanceResult(params: {
  monthlySavings: number;
}): Promise<boolean> {
  return shareTextResult(buildRefinanceShareMessage(params));
}

export async function shareAffordabilityResult(params?: {
  maxRecommendedDividend?: number;
}): Promise<boolean> {
  return shareTextResult(buildAffordabilityShareMessage(params));
}

export async function shareIncomeRequiredResult(params: {
  requiredIncome: number;
  propertyValueUf: number;
}): Promise<boolean> {
  return shareTextResult(buildIncomeRequiredShareMessage(params));
}

export const shareResultService = {
  getShareAppLinkLine,
  shareTextResult,
  buildMortgageShareMessage,
  buildRefinanceShareMessage,
  buildAffordabilityShareMessage,
  buildIncomeRequiredShareMessage,
  shareMortgageResult,
  shareRefinanceResult,
  shareAffordabilityResult,
  shareIncomeRequiredResult,
  platform: Platform.OS,
};
