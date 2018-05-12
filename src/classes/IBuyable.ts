import { Price } from "./baseClasses";

export default interface IBuyable {
  onBuy: (() => void)[];
  buy: () => void;
  currentPrice: Price;
}
