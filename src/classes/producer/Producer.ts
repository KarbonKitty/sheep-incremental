import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { CurrencyValue, Lock } from "../baseClasses";
import IBuyable from "../IBuyable";

export default class Producer implements IProducerTemplate, IProducerState, IBuyable {
  template: IProducerTemplate;
  readonly type = "producer";

  public get id() : string {
    return this.template.id;
  }
  public get name(): string {
    return this.template.name;
  }
  public get desc(): string {
    return this.template.desc;
  }
  public get rawCost(): CurrencyValue[] {
    return this.template.rawCost;
  }
  public get production(): CurrencyValue[] {
    return this.template.production;
  }
  public get consumption(): CurrencyValue[] {
    return this.template.consumption;
  }
  public get buyVerb(): string {
    return this.template.buyVerb;
  }
  public get locks(): Lock[] {
    return this.template.locks;
  }

  quantity: number;

  constructor(template: IProducerTemplate, state: IProducerState) {
    this.template = template;
    this.quantity = state.quantity;
  }

  buy() {
    this.quantity++;
  }

  getCurrentPrice() {
    return this.rawCost.map(val => ({ amount: val.amount * Math.pow(1.15, this.quantity), currency: val.currency}));
  }
}