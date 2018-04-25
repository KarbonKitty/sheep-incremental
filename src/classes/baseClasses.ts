import LockList from '../data/locks';

export type Lock = keyof typeof LockList;

export type Currency = "cash" | "wheat";
export type GameEvent = "buy" | "change-selection";

export interface CurrencyValue {
  currency: Currency;
  amount: number;
}

export interface Map<T> {
  [index: string]: T;
}
