import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { CurrencyValue, Lock } from "../baseClasses";
import IBuyable from "../IBuyable";

export default class Producer implements IProducerTemplate, IProducerState, IBuyable {
  readonly type = "producer";

  id: string;
  name: string;
  desc: string;
  rawCost: CurrencyValue[];
  production: CurrencyValue[];
  consumption: CurrencyValue[];
  buyVerb: string;
  locks: Lock[];

  onBuy: (() => void)[];

  quantity: number;

  public get currentPrice() {
    return this.rawCost.map(val => ({ amount: val.amount * Math.pow(1.15, this.quantity), currency: val.currency}));
  }

  constructor(template: IProducerTemplate, state: IProducerState) {
    this.id = template.id;
    this.name = template.name;
    this.desc = template.desc;
    this.rawCost = template.rawCost;
    this.production = template.production;
    this.consumption = template.consumption;
    this.buyVerb = template.buyVerb;
    this.locks = template.locks;

    this.quantity = state.quantity;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  getConsumption(deltaT: number) {
    return this.consumption.map(con => ({ currency: con.currency, amount: con.amount * this.quantity * deltaT / 1000}));
  }

  getProduction(deltaT: number) {
    return this.production.map(pro => ({ currency: pro.currency, amount: pro.amount * this.quantity * deltaT / 1000}));
  }
}