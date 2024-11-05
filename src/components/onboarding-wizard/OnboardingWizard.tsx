import { cn } from '@/lib/utils.ts';
import { Model, steps } from '@/components/onboarding-wizard/steps.ts';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button.tsx';
import { SubmittedPage } from '@/components/onboarding-wizard/SubmittedPage.tsx';

type StepProps = {
  index: number;
  label: string;
  selected?: boolean;
};
export const Step = ({ index, label, selected }: StepProps) => {
  return (
    <div className="flex flex-row gap-4 text-sm uppercase text-white">
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

type Props = {
  onSubmit: (model: Model) => Promise<void>;
};
export const OnboardingWizard = ({ onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { name, description, schema, component: StepComponent } = steps[currentStep];
  const methods = useForm<Model>({
    resolver: yupResolver(schema as never),
    mode: 'onBlur',
  });
  const { handleSubmit, trigger } = methods;

  const setPage = useCallback((page: number) => setCurrentStep(page - 1), []);
  const onNext = async () => {
    const valid = await trigger();
    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const onBack = () => setCurrentStep((prev) => prev - 1);
  const onFormSubmitted = async (model: Partial<Model>) => {
    setIsSubmitted(true);

    await onSubmit(model as Model);

    // The form should be closed - for now we just restart it
    methods.reset();
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmitted)}>
        <div className="flex h-screen">
          <div className="m-auto flex min-h-[30rem] w-full max-w-[50rem] flex-row gap-4 rounded-3xl bg-background p-4">
            <div className="flex h-auto w-56 flex-col gap-6 rounded-xl bg-sidebar-desktop bg-cover bg-no-repeat p-8">
              {steps.map(({ name }, index) => (
                <Step key={name} index={index + 1} label={name} selected={index === currentStep} />
              ))}
            </div>

            <div className="flex h-auto w-full grow flex-col gap-4 py-8 sm:px-14">
              {!isSubmitted && (
                <>
                  <header className="flex flex-col gap-2">
                    <div className="text-3xl font-bold">{name}</div>
                    <div className="text-sm text-secondary">{description}</div>
                  </header>

                  <StepComponent setPage={setPage} />

                  <div className="flex flex-row">
                    {currentStep > 0 && (
                      <Button className="w-20 text-secondary" type="button" variant="ghost" size="lg" onClick={onBack}>
                        Go Back
                      </Button>
                    )}
                    <div className="grow" />
                    {currentStep < steps.length - 1 && (
                      <Button className="w-20" type="button" variant="primary" size="lg" onClick={onNext}>
                        Next Step
                      </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                      <Button className="w-20" type="submit" variant="primary" size="lg">
                        Confirm
                      </Button>
                    )}
                  </div>
                </>
              )}

              {isSubmitted && <SubmittedPage />}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
