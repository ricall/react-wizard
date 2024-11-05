import { useFormContext } from 'react-hook-form';
import { Model } from '@/components/onboarding-wizard/steps.ts';
import { addOnDetails, calculatorFor, PageProps, planDetails } from '@/components/onboarding-wizard/model.ts';
import { Button } from '@/components/ui/button.tsx';

export const SummaryPage = ({ setPage }: PageProps) => {
  const { getValues } = useFormContext<Model>();
  const onSelectPlan = () => setPage?.(2);

  const { plan, yearlyBilling, addOns } = getValues();
  const { costFor, formatCostFor, formatAmount } = calculatorFor(yearlyBilling);

  const { name: planName, ...planConfig } = planDetails[plan];
  const addOnConfigs = addOns.map((addOn) => addOnDetails[addOn]);
  const total = addOnConfigs.reduce((total, addOnConfig) => total + costFor(addOnConfig), costFor(planConfig));

  return (
    <div className="flex size-full flex-col gap-6 text-sm text-secondary">
      <div className="flex flex-col gap-4 rounded-2xl bg-gray-50 p-4">
        <div className="flex w-full flex-row items-center">
          <div>
            <div className="text-sm font-bold text-blue-800">
              {planName} ({yearlyBilling ? 'Yearly' : 'Monthly'})
            </div>
            <Button className="my-0 h-auto p-0 text-xs underline" variant="ghost" onClick={onSelectPlan}>
              Change
            </Button>
          </div>
          <div className="grow text-right font-bold text-blue-800">${formatCostFor(planConfig)}</div>
        </div>
        <hr />
        {addOnConfigs.map(({ name, ...addOnConfig }) => (
          <div key={name} className="flex flex-row">
            <div>{name}</div>
            <div className="grow text-right text-xs text-blue-800/80">+${formatCostFor(addOnConfig)}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-row px-4">
        <div>Total (per {yearlyBilling ? 'year' : 'month'})</div>
        <div className="grow text-right text-lg font-bold text-blue-800">${formatAmount(total)}</div>
      </div>
    </div>
  );
};
