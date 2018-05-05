import GameObject from "../gameObject/GameObject";
import IStorageState from "./IStorageState";
import IBuyable from "../IBuyable";
import { CurrencyValue } from "../baseClasses";
import IStorageTemplate from "./IStorageTemplate";

export default class Storage extends GameObject implements IStorageTemplate, IStorageState, IBuyable {
  readonly type = "storage";

  storage: CurrencyValue[];

  onBuy: (() => void)[];

  quantity: number;

  public get currentPrice() {
    return this.rawCost.map(val => ({ amount: val.amount * Math.pow(1.15, this.quantity), currency: val.currency}));
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
    return this.storage.map(s => ({ currency: s.currency, amount: s.amount * this.quantity }));
  }

  save(): IStorageState {
    return { quantity: this.quantity, locks: this.locks };
  }
}