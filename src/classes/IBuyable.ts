import { CurrencyValue } from "./baseClasses";

export default interface IBuyable {
  rawCost: CurrencyValue[];
  quantity: number;
  buyVerb: string;
}

