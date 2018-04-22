export type Currency = "cash" | "wheat";
export type GameEvent = "buy";

export interface CurrencyValue {
  currency: Currency;
  amount: number;
}

export interface Map<T> {
  [index: string]: T;
}
