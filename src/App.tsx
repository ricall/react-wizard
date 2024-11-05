import { OnboardingWizard } from '@/components/onboarding-wizard';
import { Model } from '@/components/onboarding-wizard/steps';
import { useCallback } from 'react';

function App() {
  const onSubmit = useCallback(async (model: Model) => {
    console.log('submit', model);
    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }, []);

  return <OnboardingWizard onSubmit={onSubmit} />;
}

export default App;
