import { IconThankYou } from '@/icons';

export const SubmittedPage = () => {
  return (
    <div className="my-auto flex size-full min-h-80 flex-col items-center justify-center gap-4">
      <IconThankYou className="size-16 md:size-20" />
      <header className="mt-2 text-2xl font-bold">Thank you!</header>
      <div className="text-center text-sm text-secondary">
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to
        email us at support@loremgaming.com
      </div>
    </div>
  );
};
