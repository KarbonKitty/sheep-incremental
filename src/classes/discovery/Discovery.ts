import { CurrencyValue, Lock } from "../baseClasses";
import IDiscoveryState from "./IDiscoveryState";
import IDiscoveryTemplate from "./IDiscoveryTemplate";
import IBuyable from "../IBuyable";

export default class Discovery implements IDiscoveryTemplate, IDiscoveryState, IBuyable {
  template: IDiscoveryTemplate;
  readonly type = "discovery";

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
  public get unlocks(): Lock[] {
    return this.template.unlocks;
  }
  public get buyVerb(): string {
    return this.template.buyVerb;
  }
  public get locks(): Lock[] {
    return this.template.locks;
  }

  done: boolean;

  onBuy: (() => void)[];

  constructor(template: IDiscoveryTemplate, state: IDiscoveryState) {
    this.template = template;
    this.done = state.done;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  public get currentPrice() {
    return this.rawCost;
  }
}