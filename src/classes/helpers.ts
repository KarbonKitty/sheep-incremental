import { Price } from "./baseClasses";

export class PriceHelper {
  static mulPriceByNumber(price: Price, num: number): Price {
    return price.map(v => ({ currency: v.currency, amount: v.amount * num}));
  }
}
