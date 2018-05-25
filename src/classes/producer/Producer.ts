import { Lock, Price } from "../baseClasses";
import GameObject from "../gameObject/GameObject";
import { PriceHelper } from "../helpers";
import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { Production } from "../production";

export { IProducerState, IProducerTemplate };

export class Producer extends GameObject implements IProducerTemplate, IProducerState {
  readonly type = "producer";

  rawProduction: Price;
  rawConsumption: Price;

  production: Production;
  consumption: Production;

  onBuy: Array<() => void>;

  quantity: number;

  disabled: boolean;

  public get currentPrice(): Price {
    return PriceHelper.mulPriceByNumber(this.rawCost, Math.pow(1.15, this.quantity));
  }

  constructor(template: IProducerTemplate, state: IProducerState) {
    super(template, state);

    this.rawProduction = template.rawProduction;
    this.rawConsumption = template.rawConsumption;

    if (typeof state !== 'undefined' && typeof state.production !== 'undefined') {
      this.production = new Production(state.production);
    } else {
      this.production = new Production({ baseProduction: template.rawProduction });
    }

    if (typeof state !== 'undefined' && typeof state.consumption !== 'undefined') {
      this.consumption = new Production(state.consumption);
    } else {
      this.consumption = new Production({ baseProduction: template.rawConsumption });
    }

    this.quantity = state.quantity;

    this.disabled = state.disabled || false;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  public get currentConsumption(): Price {
    return this.consumption.getTotal();
  }

  public get currentProduction(): Price {
    return this.production.getTotal();
  }

  getConsumption(deltaT: number): Price {
    return PriceHelper.mulPriceByNumber(this.currentConsumption, this.quantity * deltaT / 1000);
  }

  getProduction(deltaT: number): Price {
    return PriceHelper.mulPriceByNumber(this.currentProduction, this.quantity * deltaT / 1000);
  }

  save(): IProducerState {
    return {
      quantity: this.quantity,
      locks: this.locks,
      production: this.production.save(),
      consumption: this.consumption.save(),
      disabled: this.disabled
    };
  }
}
