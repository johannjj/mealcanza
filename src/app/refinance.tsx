import { Redirect } from 'expo-router';
import { routes } from '@/navigation/routes';

export default function RefinanceLegacyRedirect() {
  return <Redirect href={routes.refinance} />;
}
