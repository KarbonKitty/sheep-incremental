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
export type GameEvent = 'buy' | 'change-selection';
export type GameObjectType = "producer" | "discovery" | "storage";

type PriceData = {
  [P in Currency]?: number;
}

export interface Price extends PriceData {
  [index: string]: number | undefined;
}

export interface CurrencyValue {
  currency: Currency;
  amount: number;
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