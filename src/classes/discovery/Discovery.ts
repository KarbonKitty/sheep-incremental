import { CurrencyValue, Lock } from "../baseClasses";
import IDiscoveryState from "./IDiscoveryState";
import IDiscoveryTemplate from "./IDiscoveryTemplate";
import IBuyable from "../IBuyable";
import GameObject from "../gameObject/GameObject";

export default class Discovery extends GameObject implements IDiscoveryTemplate, IDiscoveryState, IBuyable {
  readonly type = "discovery";

  unlocks: Lock[];

  done: boolean;

  onBuy: (() => void)[];

  constructor(template: IDiscoveryTemplate, state: IDiscoveryState) {
    super(template);
    
    this.unlocks = template.unlocks;

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