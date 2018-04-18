export type Currency = "grass" | "hay" | "wool";

export interface SingleCost {
  currency: Currency;
  amount: number;
}

export interface Cost {
  actualCost: SingleCost | SingleCost[];
}

export interface Production {
  currency: Currency;
  amountPerSecond: number;
}