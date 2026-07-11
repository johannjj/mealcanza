import { SimulationSummaryCard } from '@/components/simulation/SimulationSummaryCard';
import type { AffordabilityFormValues } from '@/utils/validations';
import { formatCLP } from '@/utils/currency';

type Props = {
  values: AffordabilityFormValues;
};

export function AffordabilitySummaryCard({ values }: Props) {
  return (
    <SimulationSummaryCard
      items={[
        { label: 'Sueldo líquido', value: formatCLP(values.netSalary) },
        { label: 'Vivienda actual', value: formatCLP(values.currentHousingCost) },
        { label: 'Créditos', value: formatCLP(values.monthlyCredits) },
        { label: 'Gastos fijos', value: formatCLP(values.fixedExpenses) },
        { label: 'Cargas', value: String(values.dependents) },
      ]}
    />
  );
}
