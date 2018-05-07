import LockList from '../data/locks';

export type Lock = keyof typeof LockList;

export type Currency = "herbs" | "grain" | "flour" | "water" | "bread" | "flint" | "wood" | "stone tools" | "mud bricks" 
| "raw meat" | "meat" ;
export type GameEvent = 'buy' | 'change-selection';
export type GameObjectType = "producer" | "discovery" | "storage";

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
  precision: number
}