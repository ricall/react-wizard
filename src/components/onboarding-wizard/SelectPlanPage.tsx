import { Label } from '@radix-ui/react-label';
import { Controller, useFormContext } from 'react-hook-form';

import * as yup from 'yup';
import 'yup-phone-lite';
import { Switch } from '@/components/ui/switch.tsx';
import { cn } from '@/lib/utils.ts';
import { Plan, planDetails, plans } from '@/components/onboarding-wizard/model.ts';
import { Button } from '@/components/ui/button.tsx';

export const schema = yup
  .object({
    plan: yup.string().oneOf(['ARCADE', 'ADVANCED', 'PRO'], 'Please select a plan').required('Please select a plan'),
    yearlyBilling: yup.boolean().default(false),
  })
  .required();
type Form = yup.InferType<typeof schema>;

type PlanButtonProps = {
  plan: Plan;
  selected: boolean;
  onChange: (value: Plan) => void;
};
export const PlanButton = ({ plan, selected, onChange }: PlanButtonProps) => {
  const { name, icon: Icon, monthlyCost, yearlyCost, yearlyBonus } = planDetails[plan];
  const { watch } = useFormContext<Form>();
  const yearlyBilling = watch('yearlyBilling');
  const cost = yearlyBilling ? `${yearlyCost}/yr` : `${monthlyCost}/mo`;

  return (
    <Button
      type="button"
      variant="outline"
      className={cn('h-auto md:h-[9rem] w-full flex flex-row md:flex-col gap-4 items-start justify-start rounded-xl p-4', {
        'bg-blue-800 text-white hover:text-white hover:bg-blue-800/80': selected,
      })}
      onClick={() => onChange(plan)}
    >
      <Icon className="min-h-9 min-w-9" />
      <div className="flex h-full flex-col items-start">
        <div className="md:grow" />
        <div>{name}</div>
        <div className="text-secondary">${cost}</div>
        {yearlyBilling && <div className={cn('text-xs', selected ? 'text-white' : 'text-blue-800/80')}>{yearlyBonus}</div>}
      </div>
    </Button>
  );
};

export const SelectPlanPage = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Form>();
  const currentPlan = watch('plan');
  const yearlyBilling = watch('yearlyBilling');
  const handleOnPlanButtonChange = (newPlan: Plan) => setValue('plan', newPlan);

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-col gap-1">
        {errors.plan && <Label className="flex-1 text-right font-bold text-red-500">{errors.plan.message}</Label>}
        <div className="flex flex-col justify-evenly gap-4 md:flex-row">
          {plans.map((plan) => (
            <PlanButton key={plan} plan={plan} selected={plan === currentPlan} onChange={handleOnPlanButtonChange} />
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center bg-gray-100 py-3">
        <div className="flex flex-row gap-6 align-baseline">
          <Label className={cn('text-xs font-bold text-blue-800', { 'text-secondary': yearlyBilling })}>Monthly</Label>
          <Controller
            name="yearlyBilling"
            render={({ field: { value, onChange } }) => (
              <Switch
                className="-mt-0.5 data-[state=checked]:bg-blue-800 data-[state=unchecked]:bg-blue-800"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label className={cn('text-xs font-bold text-blue-800', { 'text-secondary': !yearlyBilling })}>Yearly</Label>
        </div>
      </div>
    </div>
  );
};
