import { PersonalInfo, schema as personalInfoSchema } from '@/components/wizard/PersonalInfo.tsx';
import { SelectPlan, schema as selectPlanSchema } from '@/components/wizard/SelectPlan.tsx';
import * as yup from 'yup';
import { Step } from '@/components/wizard/model.ts';

export type Model = yup.InferType<typeof personalInfoSchema> & yup.InferType<typeof selectPlanSchema>;

export const steps: Step<Model>[] = [
  {
    name: 'Your Info',
    description: 'Please provide your name, email address and phone number',
    schema: personalInfoSchema,
    component: PersonalInfo,
  },
  {
    name: 'Select Plan',
    description: 'You have the option of monthly or yearly billing',
    schema: selectPlanSchema,
    component: SelectPlan,
  },
];
