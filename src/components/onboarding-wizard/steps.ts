import { PersonalInfoPage, schema as personalInfoSchema } from '@/components/onboarding-wizard/PersonalInfoPage.tsx';
import { SelectPlanPage, schema as selectPlanSchema } from '@/components/onboarding-wizard/SelectPlanPage.tsx';
import { AddOnsPage, schema as pickAddOnsSchema } from '@/components/onboarding-wizard/AddOnsPage.tsx';

import * as yup from 'yup';
import { SummaryPage } from '@/components/onboarding-wizard/SummaryPage.tsx';
import { Step } from '@/components/onboarding-wizard/model.ts';

export type Model = yup.InferType<typeof personalInfoSchema> &
  yup.InferType<typeof selectPlanSchema> &
  yup.InferType<typeof pickAddOnsSchema>;

export const steps: Step<Model>[] = [
  {
    name: 'Your Info',
    description: 'Please provide your name, email address and phone number',
    schema: personalInfoSchema,
    component: PersonalInfoPage,
  },
  {
    name: 'Select Plan',
    description: 'You have the option of monthly or yearly billing',
    schema: selectPlanSchema,
    component: SelectPlanPage,
  },
  {
    name: 'Add-ons',
    description: 'Add-ons help enhance your gaming experience',
    schema: pickAddOnsSchema,
    component: AddOnsPage,
  },
  {
    name: 'Summary',
    description: 'Double-check everything looks OK before confirming',
    schema: selectPlanSchema.concat(pickAddOnsSchema),
    component: SummaryPage,
  },
];
