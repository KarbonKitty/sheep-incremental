import { Price } from "./baseClasses";

export class PriceHelper {
  static mulPriceByNumber(price: Price, num: number): Price {
    let newPrice: Price = {};
    Object.keys(price).map(k => newPrice[k] = (price[k] || 0) * num);
    return newPrice;
  }

  static sumPrices(price: Price, ...prices: Price[]): Price {
    if (prices.length === 0) {
      return price
    } else if (price.length === 1) {
      return this.addTwoPrices(price, prices[0]);
    } else {
      prices.push(price);
      return prices.reduce((a, b) => this.addTwoPrices(a, b));
    }
  }

  private static addTwoPrices(price1: Price, price2: Price): Price {
    let newPrice: Price = {};
    Object.keys(price1).map(k => newPrice[k] = price1[k]);
    Object.keys(price2).map(k => newPrice[k] ? (newPrice[k] as number) += (price2[k] || 0) : newPrice[k] = price2[k]);
    return newPrice;
  }
}
