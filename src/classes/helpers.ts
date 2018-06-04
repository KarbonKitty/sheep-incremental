import { Price, IResourcesData, CurrencyArray, Currency } from "./baseClasses";

export function mulPriceByNumber(price: Price, num: number): Price {
  const newPrice: Price = {};
  Object.keys(price).map(k => newPrice[k] = (price[k] || 0) * num);
  return newPrice;
}

export function multiplyPrices(price1: Price, price2: Price): Price {
  if (Object.keys(price1).length === 0) {
    return price2;
  }

  if (Object.keys(price2).length === 0) {
    return price1;
  }

  const newPrice: Price = {};

  for (const p1k in price1) {
    newPrice[p1k] = (price1[p1k] || 1) * (price2[p1k] || 1);
  }
  for (const p2k in price2) {
    if (!newPrice[p2k]) {
      newPrice[p2k] = (price1[p2k] || 1) * (price2[p2k] || 1);
    }
  }

  return newPrice;
}

export function sumPrices(price: Price, ...prices: Price[]): Price {
  if (prices.length === 0) {
    return price;
  } else if (price.length === 1) {
    return addTwoPrices(price, prices[0]);
  } else {
    prices.push(price);
    return prices.reduce((a, b) => addTwoPrices(a, b));
  }
}

export function getPriceCurrencies(price: Price): Currency[] {
  const currencies = Object.keys(price);
  if (currencies.filter(c => CurrencyArray.indexOf(c as Currency) === -1).length > 0) {
    throw new Error("Price has a currency that doesn't exist: " + JSON.stringify(price));
  }
  return currencies as Currency[];
}

export function canBePaid(price: Price, resources: IResourcesData): boolean {
  return getPriceCurrencies(price).reduce((acc, cur) => acc && resources[cur].amount >= (price[cur] || 0), true);
}

function addTwoPrices(price1: Price, price2: Price): Price {
  const newPrice: Price = {};
  Object.keys(price1).map(k => newPrice[k] = price1[k]);
  Object.keys(price2).map(k => newPrice[k] ? (newPrice[k] as number) += (price2[k] || 0) : newPrice[k] = price2[k]);
  return newPrice;
}
