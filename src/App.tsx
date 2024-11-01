import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
        <div className="gap-4 columns-2">
          <div className="text-right">Field One:</div>
          <input className="border border-black rounded px-2 w-full" defaultValue="test" {...register('example')} />
        </div>

        <div className="gap-4 columns-2">
          <div className="text-right">Field Two:</div>
          <div className="flex flex-col">
            <input
              className="border border-black rounded px-2 w-full"
              placeholder="some text is required here"
              {...register('exampleRequired', { required: true })}
            />
            {errors.exampleRequired && <div className="text-sm text-red-400">This field is required</div>}
          </div>
        </div>

        <input className="rounded border bg-gray-200" type="submit" />
      </div>
    </form>
  );
}

export default App;
