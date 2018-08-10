import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { Price, IResourcesData } from "./baseClasses";
import { mulPriceByNumber, canBePaid } from "./helpers";

export interface IExpeditionState extends IGameObjectState {
  timesCompleted: number;
  timeLeftToComplete: number; // if 0, complete, if > 0, in progress
}

export interface IExpeditionTemplate extends IGameObjectTemplate {
  reward: Price;
  length: number;
}

export class Expedition extends GameObject {
  readonly type = 'expedition';
  readonly costMultiplier = 1.10;

  template: IExpeditionTemplate;

  timesCompleted: number;
  timeLeftToComplete: number;

  onBuy = [] as Array<() => void>;

  public get currentPrice(): Price {
    return mulPriceByNumber(this.cost.getTotal(), Math.pow(this.costMultiplier, this.timesCompleted));
  }

  constructor(template: IExpeditionTemplate, state: IExpeditionState) {
    super(template, state);

    this.template = template;

    this.timesCompleted = state.timesCompleted;
    this.timeLeftToComplete = state.timeLeftToComplete;
  }

  save(): IExpeditionState {
    return {
      timesCompleted: this.timesCompleted,
      timeLeftToComplete: this.timeLeftToComplete
    };
  }

  canBeBought(resources: IResourcesData): boolean {
    return canBePaid(this.currentPrice, resources);
  }

  buy(): void {
    this.timeLeftToComplete = this.template.length;
  }

  isAvailable(): boolean {
    return this.locks.length === 0;
  }

  isActive(): boolean {
    return this.timeLeftToComplete > 0;
  }

  passTime(time: number): number {
    this.timeLeftToComplete -= time;
    if (this.timeLeftToComplete <= 0) {
      this.complete();
      this.timeLeftToComplete = 0;
    }
    return this.timeLeftToComplete;
  }

  private complete(): void {
    this.onBuy.forEach(handler => handler());
  }
}
