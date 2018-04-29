import LockList from '../data/locks';

export type Lock = keyof typeof LockList;

export type Currency = "cash" | "wheat";
export type GameEvent = 'buy' | 'change-selection' | 'discover';
export type GameObjectType = "producer" | "discovery";

export interface CurrencyValue {
  currency: Currency;
  amount: number;
}

export interface Map<T> {
  [index: string]: T;
}
