import { Redirect } from 'expo-router';
import { routes } from '@/navigation/routes';

export default function AffordabilityLegacyRedirect() {
  return <Redirect href={routes.affordability} />;
}
