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

export interface IProjectState extends IGameObjectState {
  timesCompleted: number;
}

export interface IProjectTemplate extends IGameObjectTemplate {
  reward: IRewardItem[];
  length: number;
}

export class Project extends GameObject {
  readonly type = 'project';
  readonly costMultiplier = 1.10;

  template: IProjectTemplate;

  timesCompleted: number;

  public get currentPrice(): Price {
    return mulPriceByNumber(this.cost.getTotal(), Math.pow(this.costMultiplier, this.timesCompleted));
  }

  constructor(template: IProjectTemplate, state: IProjectState) {
    super(template, state);

    this.template = template;

    this.timesCompleted = state.timesCompleted;
  }

  save(): IProjectState {
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
