import { LocksData as LockList } from "../data";

export type Lock = keyof typeof LockList;

type Indexed<T extends string, U> = {
  [P in T]: U;
};

export type GameObjectId = string;

export interface IResourcesTemplateData extends Indexed<Currency, IResourceTemplate> { }

export interface IResourcesData extends Indexed<Currency, IResource> { }

const CurrencyObject = {
  territory: true,
  folklore: true,
  wood: true,
  flint: true,
  "stone tools": true,
  "complex tools": true,
  "raw meat": true,
  meat: true,
  "animal skin": true,
  "raw vegetables": true,
  "vegetables": true,
  advancement: true,
};

export const CurrencyArray = Object.keys(CurrencyObject) as Currency[];

export type Currency = keyof typeof CurrencyObject;
export type EffectProp = "cost" | "production" | "consumption" | "storage";
export type GameEvent = 'buy' | 'change-selection' | 'prestige' | 'disable' | 'change-branch';
export type GameObjectType = "building" | "idea" | "expedition";

const industryBranchesObject = {
  prestige: true,
  housing: true,
  construction: true,
  tools: true,
  food: true,
  hunting: true,
  culture: true,
  expedition: true
};
export const branchesArray = Object.keys(industryBranchesObject) as IndustryBranch[];

export type IndustryBranch = keyof typeof industryBranchesObject;

export interface Price extends Partial<Indexed<Currency, number>> {
  [index: string]: number | undefined;
}

export interface Map<T> {
  [index: string]: T;
}

export interface IResourceTemplate {
  name: string;
  baseLimit?: number;
  precision: number;
  originalLocks: Lock[];
}

export interface IResource {
  template: IResourceTemplate;
  limit?: number;
  amount: number;
  gainPerSecond: number[];
  locks: Lock[];
  amountSpent: number;
}

export interface UpgradeEffect {
  affectedObjectId: string;
  affectedProperty: EffectProp;
  type: "add" | "mul";
  scale: Price;
}

export interface IPopulation {
  workers: number;
  population: number;
  housing: number;
}
