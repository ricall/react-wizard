import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input.tsx';
import { useFormContext } from 'react-hook-form';

import * as yup from 'yup';
import 'yup-phone-lite';

export const schema = yup
  .object({
    name: yup.string().required('This field is required'),
    emailAddress: yup.string().email('This field is not a valid email').required('This field is required'),
    phoneNumber: yup.string().phone('in').required('This field is required'),
  })
  .required();
type Form = yup.InferType<typeof schema>;

export const PersonalInfoPage = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Form>();

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row text-sm">
          <Label className="text-xs">Name</Label>
          {errors.name && <Label className="flex-1 text-right font-bold text-red-500">{errors.name.message}</Label>}
        </div>
        <Input className="w-full rounded border border-black px-2 font-bold" placeholder="e.g. John Smith" {...register('name')} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-row text-sm">
          <Label className="text-xs">Email Address</Label>
          {errors.emailAddress && <Label className="flex-1 text-right font-bold text-red-500">{errors.emailAddress.message}</Label>}
        </div>
        <Input
          className="w-full rounded border border-black px-2 font-bold"
          placeholder="e.g. john.smith@gmail.com"
          {...register('emailAddress')}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-row text-sm">
          <Label className="text-xs">Phone Number</Label>
          {errors.phoneNumber && <Label className="flex-1 text-right font-bold text-red-500">{errors.phoneNumber.message}</Label>}
        </div>
        <Input
          className="w-full rounded border border-black px-2 font-bold"
          placeholder="e.g. +1 1 718 222 2222"
          {...register('phoneNumber')}
        />
      </div>
    </div>
  );
};
