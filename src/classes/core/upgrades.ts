import { Price } from './price';
import { GameObjectId, EffectProp } from './base';
import { IRewardItem } from '../Project';

export interface PriceUpgradeEffect {
    affectedObjectId: GameObjectId;
    affectedProperty: EffectProp;
    type: "add" | "mul";
    scale: Price;
}

export interface RewardUpgradeEffect {
    affectedObjectId: GameObjectId;
    scale: IRewardItem[];
}

export type UpgradeEffect = RewardUpgradeEffect | PriceUpgradeEffect;
