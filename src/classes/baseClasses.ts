export type Currency = "carbon" | "hydrogen" | "oxygen";
export type GameEvent = "buy";

export interface SingleCost {
  currency: Currency;
  amount: number;
}

export interface Production {
  currency: Currency;
  amountPerSecond: number;
}

export interface Map<T> {
  [index: string]: T;
}
