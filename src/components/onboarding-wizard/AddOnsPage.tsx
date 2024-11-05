import * as yup from 'yup';
import { AddOn, addOnDetails, addOns, calculatorFor } from '@/components/onboarding-wizard/model.ts';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils.ts';
import { CheckedState } from '@radix-ui/react-checkbox';

export const schema = yup
  .object({
    yearlyBilling: yup.boolean().default(false),
    addOns: yup.array().of(yup.string().oneOf(addOns).required()).default([]),
  })
  .required();
type Form = yup.InferType<typeof schema>;

type AddOnButtonProps = {
  addOn: AddOn;
};
const AddOnButton = ({ addOn }: AddOnButtonProps) => {
  const { watch, setValue } = useFormContext<Form>();

  const values: AddOn[] = watch('addOns') ?? [];
  const yearlyBilling = watch('yearlyBilling');
  const checked = values.includes(addOn);
  const { name, description, ...addOnDetail } = addOnDetails[addOn];
  const { formatCostFor } = calculatorFor(yearlyBilling);

  const handleChange = (state: CheckedState) =>
    setValue('addOns', state === true ? [...values, addOn] : values.filter((value) => value !== addOn));

  return (
    <div className={cn('flex flex-row gap-4 items-center w-full px-4 py-3 rounded-xl border', { 'border-blue-800 bg-gray-50': checked })}>
      <Checkbox className="data-[state=checked]:bg-blue-800" checked={checked} onCheckedChange={handleChange} />
      <div className="flex grow flex-col items-start gap-0">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-xs text-secondary">{description}</div>
      </div>
      <div className="text-sm text-blue-800">+${formatCostFor(addOnDetail)}</div>
    </div>
  );
};

export const AddOnsPage = () => {
  return (
    <div className="flex w-full grow flex-col gap-3">
      {addOns.map((addOn) => (
        <AddOnButton key={addOn} addOn={addOn} />
      ))}
    </div>
  );
};
