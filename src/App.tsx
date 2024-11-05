import { OnboardingWizard, Model } from '@/components/onboarding-wizard';
import { useCallback } from 'react';

function App() {
  const onSubmit = useCallback(async (model: Model) => {
    console.log('submit', model);
    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }, []);

  return <OnboardingWizard onSubmit={onSubmit} />;
}

export default App;
