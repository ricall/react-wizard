import { ComponentType } from 'react';
import { Schema } from 'yup';
import { IconAdvanced, IconArcade, IconPro } from '@/icons';

export type Step<T> = {
  name: string;
  description: string;
  schema: Schema<Partial<T>>;
  component: ComponentType;
};

export type Plan = 'ARCADE' | 'ADVANCED' | 'PRO';
export const plans: Plan[] = ['ARCADE', 'ADVANCED', 'PRO'];

export type PlanDetails = {
  name: string;
  icon: typeof IconAdvanced;
  monthlyCost: number;
  yearlyCost: number;
};
export const planDetails: Record<Plan, PlanDetails> = {
  ARCADE: {
    name: 'Arcade',
    icon: IconArcade,
    monthlyCost: 9,
    yearlyCost: 90,
  },
  ADVANCED: {
    name: 'Advanced',
    icon: IconAdvanced,
    monthlyCost: 12,
    yearlyCost: 120,
  },
  PRO: {
    name: 'Pro',
    icon: IconPro,
    monthlyCost: 15,
    yearlyCost: 150,
  },
};
