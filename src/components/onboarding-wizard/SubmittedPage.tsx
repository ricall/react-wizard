import { IconThankYou } from '@/icons';

export const SubmittedPage = () => {
  return (
    <div className="w-full h-full items-center my-auto flex flex-col gap-4 justify-center">
      <IconThankYou className="w-20 h-20" />
      <header className="text-2xl font-bold mt-2">Thank you!</header>
      <div className="text-secondary text-center text-sm">
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to
        email us at support@loremgaming.com
      </div>
    </div>
  );
};
