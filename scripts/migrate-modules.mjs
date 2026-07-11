#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const moves = [
  ['src/features/mortgage/MortgageSimulatorScreen.tsx', 'src/modules/housing/screens/MortgageSimulatorScreen.tsx'],
  ['src/features/mortgage/UfRateBanner.tsx', 'src/modules/housing/components/UfRateBanner.tsx'],
  ['src/features/mortgage/MortgageFormCard.tsx', 'src/modules/housing/components/mortgage/MortgageFormCard.tsx'],
  ['src/features/mortgage/MortgageResultCard.tsx', 'src/modules/housing/components/mortgage/MortgageResultCard.tsx'],
  ['src/features/mortgage/MortgageSummaryCard.tsx', 'src/modules/housing/components/mortgage/MortgageSummaryCard.tsx'],
  ['src/features/mortgage/MortgageCompareTermsCard.tsx', 'src/modules/housing/components/mortgage/MortgageCompareTermsCard.tsx'],
  ['src/features/mortgage/MortgageImproveTipsCard.tsx', 'src/modules/housing/components/mortgage/MortgageImproveTipsCard.tsx'],
  ['src/features/refinance/RefinanceSimulatorScreen.tsx', 'src/modules/housing/screens/RefinanceSimulatorScreen.tsx'],
  ['src/features/refinance/RefinanceFormCard.tsx', 'src/modules/housing/components/refinance/RefinanceFormCard.tsx'],
  ['src/features/refinance/RefinanceResultCard.tsx', 'src/modules/housing/components/refinance/RefinanceResultCard.tsx'],
  ['src/features/refinance/RefinanceSummaryCard.tsx', 'src/modules/housing/components/refinance/RefinanceSummaryCard.tsx'],
  ['src/features/affordability/AffordabilityScreen.tsx', 'src/modules/housing/screens/AffordabilityScreen.tsx'],
  ['src/features/affordability/AffordabilityFormCard.tsx', 'src/modules/housing/components/affordability/AffordabilityFormCard.tsx'],
  ['src/features/affordability/AffordabilityResultCard.tsx', 'src/modules/housing/components/affordability/AffordabilityResultCard.tsx'],
  ['src/features/affordability/AffordabilitySummaryCard.tsx', 'src/modules/housing/components/affordability/AffordabilitySummaryCard.tsx'],
  ['src/features/income-required/IncomeRequiredScreen.tsx', 'src/modules/housing/screens/IncomeRequiredScreen.tsx'],
  ['src/features/income-required/IncomeRequiredFormCard.tsx', 'src/modules/housing/components/incomeRequired/IncomeRequiredFormCard.tsx'],
  ['src/features/income-required/IncomeRequiredResultCard.tsx', 'src/modules/housing/components/incomeRequired/IncomeRequiredResultCard.tsx'],
  ['src/features/home/HomeScreen.tsx', 'src/modules/suite/screens/HomeScreen.tsx'],
  ['src/components/home/HomeHeroCard.tsx', 'src/modules/suite/components/HomeHeroCard.tsx'],
  ['src/components/home/UfHeroCard.tsx', 'src/modules/suite/components/UfHeroCard.tsx'],
  ['src/components/home/ToolAccessButton.tsx', 'src/modules/suite/components/ToolAccessButton.tsx'],
  ['src/components/home/TrustCard.tsx', 'src/modules/suite/components/TrustCard.tsx'],
];

for (const [from, to] of moves) {
  const src = path.join(root, from);
  const dest = path.join(root, to);
  if (!fs.existsSync(src)) {
    console.warn('skip missing', from);
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('copied', to);
}

console.log('done');
