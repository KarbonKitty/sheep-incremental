import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { Price, SiteSet } from "./core";
import { mulPriceByNumber, sumPrices, sumSiteSets } from "./helpers";

export const rewardChanceType = {
  always: 1,
  common: 0.75,
  uncommon: 0.5,
  rare: 0.25,
  veryRare: 0.1,
  exceptional: 0.05
};

export type RewardChance = keyof typeof rewardChanceType;

export interface IRewardItem {
  type: RewardChance;
  resources?: Price;
  sites?: SiteSet;
}

export interface IProjectState extends IGameObjectState {
  timesCompleted: number;
  reward?: IRewardItem[];
}

export interface IProjectTemplate extends IGameObjectTemplate {
  baseReward: IRewardItem[];
  length: number;
}

export class Project extends GameObject {
  readonly type = 'project';
  readonly costMultiplier = 1.10;

  template: IProjectTemplate;

  timesCompleted: number;
  reward: IRewardItem[];

  public get currentPrice(): Price {
    return mulPriceByNumber(this.cost.getTotal(), Math.pow(this.costMultiplier, this.timesCompleted));
  }

  constructor(template: IProjectTemplate, state: IProjectState) {
    super(template, state);

    this.template = template;

    this.timesCompleted = state.timesCompleted;
    this.reward = state.reward || template.baseReward.slice();
  }

  save(): IProjectState {
    return {
      timesCompleted: this.timesCompleted,
    };
  }

  isAvailable(): boolean {
    return this.locks.length === 0;
  }

  getReward(): { resourceReward: Price, sitesReward: SiteSet } {
    const rewardsEarned = this.reward.filter(ri => Math.random() < rewardChanceType[ri.type]);
    const resourceReward = sumPrices({} as Price, ...rewardsEarned.map(r => r.resources || {}));
    const sitesReward = sumSiteSets({} as SiteSet, ...rewardsEarned.map(r => r.sites || {}));

    return { resourceReward, sitesReward };
  }
}
