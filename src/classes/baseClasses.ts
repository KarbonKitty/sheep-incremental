import { LocksData as LockList } from '../data';

export type Lock = keyof typeof LockList;

export interface IResourcesData {
  [index: string]: IResource;

  herbs: IResource,
  wood: IResource,
  flint: IResource,
  "stone tools": IResource,
  grain: IResource,
  flour: IResource,
  water: IResource,
  bread: IResource,
  beer: IResource,
  "mud bricks": IResource,
  "raw meat": IResource,
  meat: IResource,
}

export type Currency = keyof IResourcesData;
export type EffectProp = "cost" | "production" | "consumption" | "storage";
export type GameEvent = 'buy' | 'change-selection' | 'prestige' | 'disable';
export type GameObjectType = "producer" | "discovery" | "storage" | "upgrade";

const industryBranchesObject = { "herbs": true, "construction": true, "bread": true, "beer": true, "hunting": true, "pottery": true };
export const branchesArray = Object.keys(industryBranchesObject) as IndustryBranch[];

export type IndustryBranch = keyof typeof industryBranchesObject;

type PriceData = {
  [P in Currency]?: number;
}

export interface Price extends PriceData {
  [index: string]: number | undefined;
}

export interface Map<T> {
  [index: string]: T;
}

export interface IResource {
  name: string,
  limit?: number,
  amount: number,
  gainPerSecond: number,
  precision: number,
  locks: Lock[]
}

export interface UpgradeEffect {
  affectedObjectId: string;
  affectedProperty: EffectProp;
  type: "add" | "mul";
  scale: Price;
}
