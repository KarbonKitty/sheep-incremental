import { Price, CurrencyValue } from "./baseClasses";

export class PriceHelper {
  static mulPriceByNumber(price: Price, num: number): Price {
    return price.map(v => ({ currency: v.currency, amount: v.amount * num}));
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
    const firstPriceCurrencies = price1.map(v => v.currency);
    let newPrice = (<Price>[]).concat(price1);
    price2.forEach(e => {
      if (firstPriceCurrencies.indexOf(e.currency) > -1) {
        const valToSum = <CurrencyValue>newPrice.filter(v => v.currency === e.currency).pop();
        valToSum.amount += e.amount;
      } else {
        newPrice.push(e);
      }
    });
    return newPrice;
  }
}
