import { Price } from "./baseClasses";

export default interface IBuyable {
  onBuy: Array<() => void>;
  buy: () => void;
  currentPrice: Price;
}
