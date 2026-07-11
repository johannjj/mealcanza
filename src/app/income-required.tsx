import { Redirect } from 'expo-router';
import { routes } from '@/navigation/routes';

export default function IncomeRequiredLegacyRedirect() {
  return <Redirect href={routes.incomeRequired} />;
}
