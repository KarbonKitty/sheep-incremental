import LockList from '../data/locks';

export type Lock = keyof typeof LockList;

export type Currency = "cash" | "wheat";
export type GameEvent = 'buy' | 'change-selection' | 'discover';
export type BuyAction = 'addOne' | 'discover';

export interface CurrencyValue {
  currency: Currency;
  amount: number;
}

export interface Map<T> {
  [index: string]: T;
}
