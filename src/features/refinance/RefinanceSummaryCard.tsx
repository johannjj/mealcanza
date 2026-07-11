import { SimulationSummaryCard } from '@/components/simulation/SimulationSummaryCard';
import type { RefinanceFormValues } from '@/utils/validations';
import { formatCLP } from '@/utils/currency';

type Props = {
  values: RefinanceFormValues;
};

export function RefinanceSummaryCard({ values }: Props) {
  return (
    <SimulationSummaryCard
      items={[
        { label: 'Saldo deuda', value: formatCLP(values.currentBalance) },
        { label: 'Dividendo actual', value: formatCLP(values.currentMonthlyPayment) },
        { label: 'Tasa actual', value: `${values.currentRatePercent}%` },
        { label: 'Nueva tasa', value: `${values.newRatePercent}%` },
        { label: 'Plazo restante', value: `${values.remainingTermYears} años` },
        { label: 'Costo refinanciamiento', value: formatCLP(values.refinanceCost) },
      ]}
    />
  );
}
