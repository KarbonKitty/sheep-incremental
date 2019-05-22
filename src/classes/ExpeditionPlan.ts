import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { Price, SiteSet } from "./baseClasses";
import { mulPriceByNumber, sumPrices, sumSiteSets } from "./helpers";

export interface IRewardItem {
  chance: number;
  resources?: Price;
  sites?: SiteSet;
}

export interface IExpeditionPlanState extends IGameObjectState {
  timesCompleted: number;
}

export interface IExpeditionPlanTemplate extends IGameObjectTemplate {
  reward: IRewardItem[];
  length: number;
}

export class ExpeditionPlan extends GameObject {
  readonly type = 'expedition';
  readonly costMultiplier = 1.10;

  template: IExpeditionPlanTemplate;

  timesCompleted: number;

  public get currentPrice(): Price {
    return mulPriceByNumber(this.cost.getTotal(), Math.pow(this.costMultiplier, this.timesCompleted));
  }

  constructor(template: IExpeditionPlanTemplate, state: IExpeditionPlanState) {
    super(template, state);

    this.template = template;

    this.timesCompleted = state.timesCompleted;
  }

  save(): IExpeditionPlanState {
    return {
      timesCompleted: this.timesCompleted
    };
  }

  isAvailable(): boolean {
    return this.locks.length === 0;
  }

  getReward(): { resourceReward: Price, sitesReward: SiteSet } {
    const rewardsEarned = this.template.reward.filter(ri => Math.random() < ri.chance);
    const resourceReward = sumPrices({} as Price, ...rewardsEarned.map(r => r.resources || {}));
    const sitesReward = sumSiteSets({} as SiteSet, ...rewardsEarned.map(r => r.sites || {}));

    return { resourceReward, sitesReward };
  }
}
