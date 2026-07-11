import { Redirect } from 'expo-router';
import { routes } from '@/navigation/routes';

/** Alias legacy — mantiene deep links Android. */
export default function MortgageLegacyRedirect() {
  return <Redirect href={routes.mortgage} />;
}
