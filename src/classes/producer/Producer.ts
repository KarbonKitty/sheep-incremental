import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { CurrencyValue, Lock, BuyAction } from "../baseClasses";

export default class Producer implements IProducerTemplate, IProducerState {
  template: IProducerTemplate;
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
  public get onBuyAction(): BuyAction {
    return this.template.onBuyAction;
  }
  quantity: number;

  constructor(template: IProducerTemplate, state: IProducerState) {
    this.template = template;
    this.quantity = state.quantity;
  }
}