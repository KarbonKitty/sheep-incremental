import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { Price, Lock, CurrencyValue } from "../baseClasses";
import IBuyable from "../IBuyable";
import GameObject from "../gameObject/GameObject";

export default class Producer extends GameObject implements IProducerTemplate, IProducerState, IBuyable {
  readonly type = "producer";

  production: Price;
  consumption: Price;

  onBuy: (() => void)[];

  quantity: number;

  public get currentPrice() {
    return this.rawCost.map(val => ({ amount: val.amount * Math.pow(1.15, this.quantity), currency: val.currency}));
  }

  constructor(template: IProducerTemplate, state: IProducerState) {
    super(template, state);

    this.production = template.production;
    this.consumption = template.consumption;

    this.quantity = state.quantity;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  getConsumption(deltaT: number): CurrencyValue[] {
    return Object.keys(this.consumption).map(k => ({ currency: k, amount: this.consumption[k] * this.quantity * deltaT / 1000 }));
  }

  getProduction(deltaT: number): CurrencyValue[] {
    return Object.keys(this.production).map(k => ({ currency: k, amount: this.production[k] * this.quantity * deltaT / 1000 }));
  }

  save(): IProducerState {
    return { quantity: this.quantity, locks: this.locks };
  }
}
