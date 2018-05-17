import GameObject from "../gameObject/GameObject";
import IStorageState from "./IStorageState";
import { Price } from "../baseClasses";
import IStorageTemplate from "./IStorageTemplate";
import { PriceHelper } from "../helpers";

export default class Storage extends GameObject implements IStorageTemplate, IStorageState {
  readonly type = "storage";

  storage: Price;

  onBuy: (() => void)[];

  quantity: number;

  public get currentPrice() {
    return PriceHelper.mulPriceByNumber(this.rawCost, Math.pow(1.15, this.quantity));
  }

  constructor(template: IStorageTemplate, state: IStorageState) {
    super(template, state);

    this.storage = template.storage;

    this.quantity = state.quantity;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  getStorage() {
    return PriceHelper.mulPriceByNumber(this.storage, this.quantity);
  }

  save(): IStorageState {
    return { quantity: this.quantity, locks: this.locks };
  }
}