import { cn } from '@/lib/utils.ts';
import { Model, steps } from '@/components/onboarding-wizard/steps.ts';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button.tsx';

type StepProps = {
  index: number;
  label: string;
  selected?: boolean;
};
export const Step = ({ index, label, selected }: StepProps) => {
  return (
    <div className="flex flex-row text-white text-sm gap-4 uppercase">
      <div className={cn('border border-white rounded-full w-8 h-8 text-center content-center', { 'bg-cyan-100 text-black': selected })}>
        {index}
      </div>
      <div className="flex flex-col gap-0 text-xs">
        <div className="text-gray-400">Step {index}</div>
        <div>{label}</div>
      </div>
    </div>
  );
};

export const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const { name, description, schema, component: StepComponent } = steps[currentStep];

  const methods = useForm<Model>({
    resolver: yupResolver(schema as never),
    mode: 'onBlur',
    defaultValues: {
      yearlyBilling: false,
    },
  });
  const { handleSubmit, trigger } = methods;
  const onNext = async () => {
    const valid = await trigger();
    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const onBack = () => setCurrentStep((prev) => prev - 1);
  const onSubmit = (model: unknown) => {
    console.log('submit', model);
  };
  const setPage = useCallback((page: number) => {
    setCurrentStep(page - 1);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="m-auto w-full max-w-[50rem] bg-background p-4 rounded-3xl flex flex-row gap-4 min-h-[30rem]">
        <div className="bg-sidebar-desktop w-[14rem] h-auto rounded-xl bg-no-repeat bg-cover flex flex-col p-8 gap-6">
          {steps.map(({ name }, index) => (
            <Step key={name} index={index + 1} label={name} selected={index === currentStep} />
          ))}
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 py-8 px-14 h-full w-[32rem]">
              <header className="flex flex-col gap-2">
                <div className="font-bold text-3xl">{name}</div>
                <div className="text-secondary text-sm">{description}</div>
              </header>

              <StepComponent setPage={setPage} />

              <div className="flex flex-row">
                {currentStep > 0 && (
                  <Button className="w-[5rem] text-secondary" type="button" variant="ghost" size="lg" onClick={onBack}>
                    Go Back
                  </Button>
                )}
                <div className="grow" />
                {currentStep < steps.length - 1 && (
                  <Button className="w-[5rem]" type="button" variant="primary" size="lg" onClick={onNext}>
                    Next Step
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button className="w-[5rem]" type="submit" variant="primary" size="lg">
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
