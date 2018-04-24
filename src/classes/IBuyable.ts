import { CurrencyValue } from "./baseClasses";

export default interface IBuyable {
  name: string;
  desc: string;
  id: string;
  rawCost: CurrencyValue[];
  quantity: number;
  visible: boolean;
  buyVerb: string;
}

