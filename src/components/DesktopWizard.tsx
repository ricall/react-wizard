import { cn } from '@/lib/utils.ts';
import { PersonalInfo } from '@/components/PersonalInfo.tsx';

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

export const DesktopWizard = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-full max-w-[50rem] bg-background p-4 rounded-3xl flex flex-row gap-4 min-h-[30rem]">
        <div className="bg-sidebar-desktop w-[14rem] h-auto rounded-xl bg-no-repeat bg-cover flex flex-col p-8 gap-6">
          <Step index={1} label="Your Info" selected />
          <Step index={2} label="Select Plan" />
          <Step index={3} label="Add-Ons" />
          <Step index={4} label="Summary" />
        </div>
        <PersonalInfo />
      </div>
    </div>
  );
};
