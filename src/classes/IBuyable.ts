import { CurrencyValue, BuyAction } from "./baseClasses";

export default interface IBuyable {
  rawCost: CurrencyValue[];
  buyVerb: string;
  quantity?: number;
  onBuyAction: BuyAction;
}

