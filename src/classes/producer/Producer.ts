import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { Price, Lock } from "../baseClasses";
import IBuyable from "../IBuyable";
import GameObject from "../gameObject/GameObject";
import { PriceHelper } from "../helpers";

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

  getConsumption(deltaT: number) {
    return PriceHelper.mulPriceByNumber(this.consumption, deltaT / 1000);
  }

  getProduction(deltaT: number) {
    return PriceHelper.mulPriceByNumber(this.production, deltaT / 1000);
  }

  save(): IProducerState {
    return { quantity: this.quantity, locks: this.locks };
  }
}
