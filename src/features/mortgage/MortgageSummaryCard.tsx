import { SimulationSummaryCard } from '@/components/simulation/SimulationSummaryCard';
import { simulatorCopy } from '@/constants/copy';
import type { MortgageFormValues } from '@/utils/validations';
import { formatCLP } from '@/utils/currency';
import { formatRatePercent } from '@/utils/mortgageResultMessaging';
import { formatUF } from '@/utils/uf';

type Props = {
  values: MortgageFormValues;
  principalUf: number;
  ufValue: number;
};

export function MortgageSummaryCard({ values, principalUf, ufValue }: Props) {
  return (
    <SimulationSummaryCard
      title={simulatorCopy.summaryTitle}
      items={[
        { label: 'Propiedad', value: formatUF(values.propertyValueUf) },
        { label: 'Pie', value: formatUF(values.downPaymentUf) },
        { label: 'Monto financiado', value: formatUF(principalUf) },
        { label: 'Tasa', value: formatRatePercent(values.annualRatePercent) },
        { label: 'Plazo', value: `${values.termYears} años` },
        { label: 'UF usada', value: formatCLP(ufValue) },
      ]}
    />
  );
}
