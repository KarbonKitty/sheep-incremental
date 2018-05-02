import { CurrencyValue } from "./baseClasses";

export default interface IBuyable {
  onBuy: (() => void)[];
  buy: () => void;
  currentPrice: CurrencyValue[];
}
