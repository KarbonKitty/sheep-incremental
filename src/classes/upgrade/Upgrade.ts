import { Price, UpgradeEffect } from "../baseClasses";
import GameObject from "../gameObject/GameObject";
import IUpgradeState from "./IUpgradeState";
import IUpgradeTemplate from "./IUpgradeTemplate";

export { IUpgradeState, IUpgradeTemplate };

export class Upgrade extends GameObject implements IUpgradeTemplate, IUpgradeState {
  readonly type = "upgrade";

  objectId?: string;

  effects: UpgradeEffect[];

  onBuy: Array<() => void>;

  done: boolean;

  public get currentPrice(): Price {
    return this.rawCost;
  }

  constructor(template: IUpgradeTemplate, state: IUpgradeState) {
    super(template, state);

    this.objectId = template.objectId;

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
