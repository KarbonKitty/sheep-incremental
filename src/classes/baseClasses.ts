import { LocksData as LockList } from "../data";

export type Lock = keyof typeof LockList;

export interface ILockable { locks: Lock[]; }

type Indexed<T extends string, U> = {
  [P in T]: U;
};

export type GameObjectId = string;

export interface ISitesData extends Indexed<SiteType, ISite> { }

export interface ISitesTemplateData extends Indexed<SiteType, ISiteTemplate> { }

export interface ISitesStateData extends Partial<Indexed<SiteType, ISiteState>> { }

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
export type GameObjectType = "building" | "idea" | "project";

const industryBranchesObject = {
  housing: true,
  construction: true,
  tools: true,
  food: true,
  hunting: true,
  culture: true,
  discovery: true,
  expedition: true,
  prestige: true,
};
export const branchesArray = Object.keys(industryBranchesObject) as IndustryBranch[];
export type IndustryBranch = keyof typeof industryBranchesObject;

const siteTypesObject = {
  cave: true
};
export const SiteTypesArray = Object.keys(siteTypesObject) as SiteType[];
export type SiteType = keyof typeof siteTypesObject;

export interface Price extends Partial<Indexed<Currency, number>> {
  [index: string]: number | undefined;
}

export interface SiteSet extends Partial<Indexed<SiteType, number>> {
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

export interface IResource extends ILockable {
  template: IResourceTemplate;
  limit?: number;
  amount: number;
  gainPerSecond: number[];
  amountSpent: number;
}

export interface ISiteTemplate {
  name: SiteType;
  originalLocks: Lock[];
}

export interface ISite extends ILockable {
  template: ISiteTemplate;
  totalAmount: number;
  amountUsed: number;
}

export interface ISiteState {
  amount: number;
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
