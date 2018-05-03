import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { CurrencyValue, Lock } from "../baseClasses";
import IBuyable from "../IBuyable";
import GameObject from "../gameObject/GameObject";

export default class Producer extends GameObject implements IProducerTemplate, IProducerState, IBuyable {
  readonly type = "producer";

  production: CurrencyValue[];
  consumption: CurrencyValue[];

  onBuy: (() => void)[];

  quantity: number;

  public get currentPrice() {
    return this.rawCost.map(val => ({ amount: val.amount * Math.pow(1.15, this.quantity), currency: val.currency}));
  }

  constructor(template: IProducerTemplate, state: IProducerState) {
    super(template);

    this.production = template.production;
    this.consumption = template.consumption;

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

  save(): IProducerState {
    return { quantity: this.quantity };
  }
}
