import * as yup from 'yup';
import { addOns, AddOn, addOnDetails } from '@/components/onboarding-wizard/model.ts';
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
  const checked = values.includes(addOn);

  const handleChange = (state: CheckedState) => {
    const newValues = state === true ? [...values, addOn] : values.filter((value) => value !== addOn);
    setValue('addOns', newValues);
  };
  const { name, description, monthlyCost, yearlyCost } = addOnDetails[addOn];
  const cost = watch('yearlyBilling') ? `${yearlyCost}/yr` : `${monthlyCost}/mn`;

  return (
    <div className={cn('flex flex-row gap-4 items-center w-full p-4 rounded-xl border', { 'border-blue-800 bg-gray-50': checked })}>
      <Checkbox className="data-[state=checked]:bg-blue-800" checked={checked} onCheckedChange={handleChange} />
      <div className="flex flex-col gap-0 grow items-start">
        <div className="text-sm">{name}</div>
        <div className="text-xs text-secondary">{description}</div>
      </div>
      <div className="text-blue-800">+${cost}</div>
    </div>
  );
};

export const AddOnsPage = () => {
  return (
    <div className="w-full flex flex-col gap-3 grow">
      {addOns.map((addOn) => (
        <AddOnButton key={addOn} addOn={addOn} />
      ))}
    </div>
  );
};
