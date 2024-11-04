import { Label } from '@radix-ui/react-label';
import { Controller, useFormContext } from 'react-hook-form';

import * as yup from 'yup';
import 'yup-phone-lite';
import { Switch } from '@/components/ui/switch.tsx';
import { cn } from '@/lib/utils.ts';
import { Plan, planDetails, plans } from '@/components/wizard/model.ts';
import { Button } from '@/components/ui/button.tsx';

type PlanButtonProps = {
  plan: Plan;
  selected: boolean;
  onChange: (value: Plan) => void;
};
export const PlanButton = ({ plan, selected, onChange }: PlanButtonProps) => {
  const { name, icon: Icon, monthlyCost, yearlyCost } = planDetails[plan];
  const { watch } = useFormContext<Form>();
  const yearlyBilling = watch('yearlyBilling');
  const cost = yearlyBilling ? `${yearlyCost}/yr` : `${monthlyCost}/mo`;

  return (
    <Button
      type="button"
      variant="outline"
      className={cn('min-h-[8rem] w-full flex flex-col gap-0 items-start justify-start rounded-xl p-3', {
        'bg-blue-800 text-white hover:text-white hover:bg-blue-800/80': selected,
      })}
      onClick={() => onChange(plan)}
    >
      <Icon className="min-w-8 min-h-8" />
      <div className="grow" />
      <div>{name}</div>
      <div className="text-secondary">${cost}</div>
    </Button>
  );
};

export const schema = yup
  .object({
    plan: yup.string().oneOf(['ARCADE', 'ADVANCED', 'PRO'], 'Please select a plan').required('Please select a plan'),
    yearlyBilling: yup.boolean().default(false),
  })
  .required();
type Form = yup.InferType<typeof schema>;

export const SelectPlan = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Form>();
  const currentPlan = watch('plan');
  const yearlyBilling = watch('yearlyBilling');
  const handleOnPlanButtonChange = (newPlan: Plan) => setValue('plan', newPlan);

  return (
    <div className="flex flex-col gap-4 grow">
      <div className="flex flex-col gap-1">
        {errors.plan && <Label className="flex-1 text-right text-red-500 font-bold">{errors.plan.message}</Label>}
        <div className="flex flex-row gap-4 justify-evenly">
          {plans.map((plan) => (
            <PlanButton key={plan} plan={plan} selected={plan === currentPlan} onChange={handleOnPlanButtonChange} />
          ))}
        </div>
      </div>

      <div className="flex justify-center w-full bg-gray-100 py-3">
        <div className="flex flex-row gap-6 align-baseline">
          <Label className={cn('text-xs font-bold', { 'text-secondary': yearlyBilling })}>Monthly</Label>
          <Controller
            name="yearlyBilling"
            render={({ field: { value, onChange } }) => (
              <Switch
                className="-mt-0.5 data-[state=unchecked]:bg-blue-800 data-[state=checked]:bg-blue-800"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label className={cn('text-xs font-bold', { 'text-secondary': !yearlyBilling })}>Yearly</Label>
        </div>
      </div>
    </div>
  );
};
