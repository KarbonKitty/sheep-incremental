import GameObject from "../gameObject/GameObject";
import IUpgradeTemplate from "./IUpgradeTemplate";
import IUpgradeState from "./IUpgradeState";
import IBuyable from "../IBuyable";
import { Price, UpgradeEffect } from "../baseClasses";

export default class Upgrade extends GameObject implements IUpgradeTemplate, IUpgradeState, IBuyable {
  readonly type = "upgrade";

  effects: UpgradeEffect[];

  onBuy: (() => void)[];

  done: boolean;

  public get currentPrice(): Price {
    return this.rawCost;
  }

  constructor(template: IUpgradeTemplate, state: IUpgradeState) {
    super(template, state);

    this.effects = template.effects;

    this.done = state.done;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  save(): IUpgradeState {
    return { locks: this.locks, done: this.done };
  }
}