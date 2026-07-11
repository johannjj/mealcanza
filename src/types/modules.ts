import type { AppRoute } from '@/navigation/routes';

export type ModuleKey = 'housing' | 'car' | 'family' | 'savings' | 'retirement';

export type ModuleStatus = 'active' | 'coming_soon';

export type HousingRoute =
  | '/vivienda/simular-credito'
  | '/vivienda/refinanciar'
  | '/vivienda/capacidad-de-pago'
  | '/vivienda/cuanto-deberia-ganar';

export type HousingTool = {
  id: string;
  icon: string;
  label: string;
  description: string;
  route: HousingRoute;
};

export type UseCase = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  route: HousingRoute;
};

export type EducationArticle = {
  id: string;
  title: string;
  description: string;
  route: AppRoute;
};

export type SuiteModule = {
  key: ModuleKey;
  title: string;
  description: string;
  icon: string;
  status: ModuleStatus;
  routes?: readonly HousingRoute[];
};
