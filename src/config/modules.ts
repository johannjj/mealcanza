import { routes } from '@/navigation/routes';
import type { EducationArticle, HousingTool, SuiteModule, UseCase } from '@/types/modules';

export const housingTools: readonly HousingTool[] = [
  {
    id: 'mortgage',
    icon: '🏠',
    label: 'Simular crédito',
    description: 'Calcula tu dividendo estimado usando UF, tasa, pie y plazo.',
    route: routes.mortgage,
  },
  {
    id: 'refinance',
    icon: '🔄',
    label: 'Refinanciamiento',
    description: 'Compara tu crédito actual con una nueva tasa estimada.',
    route: routes.refinance,
  },
  {
    id: 'affordability',
    icon: '📊',
    label: 'Capacidad de pago',
    description: 'Evalúa cuánto podrías destinar mensualmente a vivienda.',
    route: routes.affordability,
  },
  {
    id: 'income',
    icon: '💰',
    label: '¿Cuánto debería ganar?',
    description: 'Descubre qué renta líquida necesitarías para comprar una propiedad.',
    route: routes.incomeRequired,
  },
] as const;

export const housingUseCases: readonly UseCase[] = [
  {
    id: 'first-home',
    title: 'Comprar mi primera vivienda',
    description: 'Estima dividendo, pie y renta necesaria.',
    actionLabel: 'Comenzar',
    route: routes.mortgage,
  },
  {
    id: 'upgrade',
    title: 'Cambiarme a una propiedad mejor',
    description: 'Evalúa qué propiedad podrías financiar.',
    actionLabel: 'Evaluar',
    route: routes.affordability,
  },
  {
    id: 'lower-dividend',
    title: 'Bajar mi dividendo actual',
    description: 'Compara si un refinanciamiento podría ayudarte.',
    actionLabel: 'Comparar',
    route: routes.refinance,
  },
  {
    id: 'income-needed',
    title: 'Saber cuánto debería ganar',
    description: 'Calcula la renta líquida necesaria para una propiedad.',
    actionLabel: 'Calcular',
    route: routes.incomeRequired,
  },
] as const;

export const educationArticles: readonly EducationArticle[] = [
  {
    id: 'uf',
    title: '¿Qué es la UF y por qué cambia?',
    description: 'Entiende cómo afecta el valor de una propiedad y el dividendo.',
    route: routes.learnUf,
  },
  {
    id: 'load',
    title: '¿Qué porcentaje de mi sueldo debería destinar al dividendo?',
    description: 'Conoce la diferencia entre un escenario cómodo, ajustado y riesgoso.',
    route: routes.learnLoad,
  },
  {
    id: 'refinance',
    title: '¿Cuándo conviene refinanciar?',
    description: 'Aprende a comparar ahorro mensual, costos y plazo de recuperación.',
    route: routes.learnRefinance,
  },
] as const;

export const suiteModules: readonly SuiteModule[] = [
  {
    key: 'housing',
    title: 'Vivienda',
    description: 'Simula dividendos, refinanciamientos y renta necesaria.',
    icon: '🏠',
    status: 'active',
    routes: housingTools.map((t) => t.route),
  },
  {
    key: 'car',
    title: 'Auto',
    description: 'Calcula el costo real de mantener un vehículo.',
    icon: '🚗',
    status: 'coming_soon',
  },
  {
    key: 'family',
    title: 'Familia',
    description: 'Estima gastos relevantes para tu hogar.',
    icon: '👶',
    status: 'coming_soon',
  },
  {
    key: 'savings',
    title: 'Ahorro e inversión',
    description: 'Evalúa metas de ahorro mensual.',
    icon: '💰',
    status: 'coming_soon',
  },
  {
    key: 'retirement',
    title: 'Jubilación',
    description: 'Proyecta tu pensión y metas futuras.',
    icon: '🌅',
    status: 'coming_soon',
  },
] as const;

export const activeModule = suiteModules.find((m) => m.status === 'active')!;

export const upcomingModules = suiteModules.filter((m) => m.status === 'coming_soon');

/** Módulos próximos visibles en Home (sin jubilación por ahora). */
export const homeUpcomingModules = upcomingModules.filter(
  (m): m is (typeof upcomingModules)[number] =>
    m.key === 'car' || m.key === 'family' || m.key === 'savings',
);
