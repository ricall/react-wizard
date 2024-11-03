import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone-lite';

const schema = yup
  .object({
    name: yup.string().required('This field is required'),
    emailAddress: yup.string().email('This field is not a valid email').required('This field is required'),
    phoneNumber: yup.string().phone('in').required('This field is required'),
  })
  .required();
type Form = yup.InferType<typeof schema>;

export const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 py-8 px-14 h-full">
        <header className="flex flex-col gap-2">
          <div className="font-bold text-3xl">Personal info</div>
          <div className="text-secondary text-sm">Please provide your name, email address and phone number</div>
        </header>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row text-sm">
            <Label className="text-xs">Name</Label>
            {errors.name && <Label className="flex-1 text-right text-red-500 font-bold">{errors.name.message}</Label>}
          </div>
          <Input className="border border-black rounded px-2 w-full font-bold" placeholder="e.g. John Smith" {...register('name')} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row text-sm">
            <Label className="text-xs">Email Address</Label>
            {errors.emailAddress && <Label className="flex-1 text-right text-red-500 font-bold">{errors.emailAddress.message}</Label>}
          </div>
          <Input
            className="border border-black rounded px-2 w-full font-bold"
            placeholder="e.g. john.smith@gmail.com"
            {...register('emailAddress')}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <div className="flex flex-row text-sm">
            <Label className="text-xs">Phone Number</Label>
            {errors.phoneNumber && <Label className="flex-1 text-right text-red-500 font-bold">{errors.phoneNumber.message}</Label>}
          </div>
          <Input
            className="border border-black rounded px-2 w-full font-bold"
            placeholder="e.g. +1 1 718 222 2222"
            {...register('phoneNumber')}
          />
        </div>

        <div className="flex flex-row justify-end gap-4 justify-self-end">
          <Button className="w-[5rem]" type="submit" variant="primary" size="lg">
            Next Step
          </Button>
        </div>
      </div>
    </form>
  );
};
