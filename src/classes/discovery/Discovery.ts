import { CurrencyValue, Lock } from "../baseClasses";
import IDiscoveryState from "./IDiscoveryState";
import IDiscoveryTemplate from "./IDiscoveryTemplate";
import IBuyable from "../IBuyable";

export default class Discovery implements IDiscoveryTemplate, IDiscoveryState, IBuyable {
  readonly type = "discovery";

  id: string;
  name: string;
  desc: string;
  rawCost: CurrencyValue[];
  buyVerb: string;
  locks: Lock[];
  unlocks: Lock[];

  done: boolean;

  onBuy: (() => void)[];

  constructor(template: IDiscoveryTemplate, state: IDiscoveryState) {
    this.id = template.id;
    this.name = template.name;
    this.desc = template.desc;
    this.rawCost = template.rawCost;
    this.buyVerb = template.buyVerb;
    this.locks = template.locks;
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