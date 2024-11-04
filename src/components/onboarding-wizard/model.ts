import { ComponentType } from 'react';
import { Schema } from 'yup';
import { IconAdvanced, IconArcade, IconPro } from '@/icons';

export type PageProps = { setPage?: (page: number) => void };
export type Step<T> = {
  name: string;
  description: string;
  schema: Schema<Partial<T>>;
  component: ComponentType<PageProps>;
};

type RecurringCost = {
  monthlyCost: number;
  yearlyCost: number;
};

export const plans = ['ARCADE', 'ADVANCED', 'PRO'] as const;
export type Plan = (typeof plans)[number];

export type PlanDetails = RecurringCost & {
  name: string;
  icon: typeof IconAdvanced;
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

export const addOns = ['ONLINE', 'STORAGE', 'CUSTOMIZE'] as const;
export type AddOn = (typeof addOns)[number];

export type AddOnDetails = RecurringCost & {
  name: string;
  description: string;
};
export const addOnDetails: Record<AddOn, AddOnDetails> = {
  ONLINE: {
    name: 'Online service',
    description: 'Access to multiplayer games',
    monthlyCost: 1,
    yearlyCost: 10,
  },
  STORAGE: {
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyCost: 2,
    yearlyCost: 20,
  },
  CUSTOMIZE: {
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthlyCost: 2,
    yearlyCost: 20,
  },
};

export type ChargeType = 'MONTHLY' | 'YEARLY';
export const costFor = (type: ChargeType, { yearlyCost, monthlyCost }: RecurringCost) => (type === 'MONTHLY' ? monthlyCost : yearlyCost);
export const formatAmount = (type: ChargeType, amount: number) => (type === 'MONTHLY' ? `${amount}/mo` : `${amount}/yr`);
export const formatCostFor = (type: ChargeType, cost: RecurringCost) => formatAmount(type, costFor(type, cost));
