import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@radix-ui/react-label';

const schema = yup
  .object({
    example: yup.string(),
    exampleRequired: yup.string().required(),
  })
  .required();
type Inputs = yup.InferType<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[32rem] flex flex-col gap-4 m-4 border border-black rounded-2xl p-4">
        <div className="flex flex-col gap-1">
          <Label>Field One:</Label>
          <Input className="border border-black rounded px-2 w-full" defaultValue="test" {...register('example')} />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Field Two:</Label>
          <div className="flex flex-col">
            <Input
              className="border border-black rounded px-2 w-full"
              placeholder="some text is required here"
              {...register('exampleRequired', { required: true })}
            />
            {errors.exampleRequired && <div className="text-sm text-red-400">This field is required</div>}
          </div>
        </div>

        <div className="flex flex-row justify-end gap-4">
          <Button className="w-[5rem]" type="reset" variant="destructive">
            Reset
          </Button>
          <Button className="w-[5rem]" type="submit" variant="default">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default App;
