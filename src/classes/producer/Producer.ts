import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { Price, Lock } from "../baseClasses";
import IBuyable from "../IBuyable";
import GameObject from "../gameObject/GameObject";
import { PriceHelper } from "../helpers";

export default class Producer extends GameObject implements IProducerTemplate, IProducerState, IBuyable {
  readonly type = "producer";

  rawProduction: Price;
  rawConsumption: Price;

  baseProduction: Price;
  baseConsumption: Price;

  productionMultiplier: Price;
  consumptionMultiplier: Price;

  onBuy: (() => void)[];

  quantity: number;

  public get currentPrice(): Price {
    return PriceHelper.mulPriceByNumber(this.rawCost, Math.pow(1.15, this.quantity));
  }

  constructor(template: IProducerTemplate, state: IProducerState) {
    super(template, state);

    this.rawProduction = template.rawProduction;
    this.rawConsumption = template.rawConsumption;

    this.baseProduction = state.baseProduction || template.rawProduction;
    this.baseConsumption = state.baseConsumption || template.rawConsumption;

    this.productionMultiplier = state.productionMultiplier || {};
    this.consumptionMultiplier = state.consumptionMultiplier || {};

    this.quantity = state.quantity;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  getConsumption(deltaT: number): Price {
    return PriceHelper.mulPriceByNumber(PriceHelper.multiplyPrices(this.baseConsumption, this.consumptionMultiplier), this.quantity * deltaT / 1000);
  }

  getProduction(deltaT: number): Price {
    return PriceHelper.mulPriceByNumber(PriceHelper.multiplyPrices(this.baseProduction, this.productionMultiplier), this.quantity * deltaT / 1000);
  }

  save(): IProducerState {
    return { quantity: this.quantity, locks: this.locks, baseProduction: this.baseProduction, baseConsumption: this.baseConsumption, productionMultiplier: this.productionMultiplier, consumptionMultiplier: this.consumptionMultiplier };
  }
}
