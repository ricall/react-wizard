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
    <div className="flex w-full flex-row gap-4 text-sm uppercase text-white">
      <div className={cn('border border-white rounded-full w-8 h-8 text-center content-center', { 'bg-cyan-100 text-black': selected })}>
        {index}
      </div>
      <div className="hidden flex-col gap-0 text-xs md:flex">
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
        <div className="flex h-screen w-screen">
          <div className="flex min-h-[30rem] w-full max-w-[50rem] flex-col bg-gray-100 md:m-auto md:flex-row md:gap-4 md:rounded-3xl md:bg-background md:p-4">
            <div className="fixed top-0 flex h-44 w-full flex-col items-start bg-sidebar-mobile bg-cover bg-no-repeat p-8 md:relative md:block md:h-auto md:w-80 md:rounded-2xl md:bg-sidebar-desktop">
              <div className="mx-auto flex flex-row gap-4 md:flex-col">
                {steps.map(({ stepName }, index) => (
                  <Step key={stepName} index={index + 1} label={stepName} selected={index === currentStep} />
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col md:px-10 md:py-4">
              <div className="z-20 m-6 mt-[6.5rem] flex h-auto grow flex-col gap-4 rounded-2xl bg-white p-4 py-8 sm:px-14 md:m-0 md:rounded-none md:p-0">
                {!isSubmitted && (
                  <>
                    <header className="mt-4 flex flex-col gap-2">
                      <div className="text-3xl font-bold text-blue-800">{name}</div>
                      <div className="text-sm text-secondary">{description}</div>
                    </header>

                    <StepComponent setPage={setPage} />
                  </>
                )}
                {isSubmitted && <SubmittedPage />}
              </div>
              {!isSubmitted && (
                <>
                  <div className="grow" />
                  <div className="fixed bottom-0 flex w-full flex-row bg-white p-4 md:relative md:p-0">
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
                  <div className="h-16 md:h-auto">&nbsp;</div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
