import { useFormContext } from 'react-hook-form';
import { Model } from '@/components/onboarding-wizard/steps.ts';
import { addOnDetails, costFor, formatAmount, formatCostFor, PageProps, planDetails } from '@/components/onboarding-wizard/model.ts';
import { Button } from '@/components/ui/button.tsx';

export const SummaryPage = ({ setPage }: PageProps) => {
  const { getValues } = useFormContext<Model>();
  const onSelectPlan = () => setPage?.(2);

  const { plan, yearlyBilling, addOns } = getValues();
  const type = yearlyBilling ? 'YEARLY' : 'MONTHLY';

  const planConfig = planDetails[plan];
  const addOnConfig = addOns.map((addOn) => addOnDetails[addOn]);
  const total = addOnConfig.reduce((total, config) => total + costFor(type, config), costFor(type, planConfig));
  return (
    <div className="w-full h-full flex flex-col gap-6 text-secondary text-sm">
      <div className="bg-gray-50 flex flex-col gap-4 p-4 rounded-2xl">
        <div className="flex flex-row items-center w-full">
          <div>
            <div className="text-blue-800 text-sm font-bold">
              {planConfig.name} ({yearlyBilling ? 'Yearly' : 'Monthly'})
            </div>
            <Button className="text-xs underline p-0 my-0 h-auto" variant="ghost" onClick={onSelectPlan}>
              Change
            </Button>
          </div>
          <div className="grow text-right text-blue-800 font-bold">${formatCostFor(type, planConfig)}</div>
        </div>
        <hr />
        {addOnConfig.map(({ name, ...config }) => (
          <div key={name} className="flex flex-row">
            <div>{name}</div>
            <div className="grow text-right text-blue-800/80 text-xs">+${formatCostFor(type, config)}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-row px-4">
        <div>Total (per {yearlyBilling ? 'year' : 'month'})</div>
        <div className="grow text-right text-blue-800 text-lg font-bold">${formatAmount(type, total)}</div>
      </div>
    </div>
  );
};
