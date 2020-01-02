import GameObject from "./gameObject/GameObject";
import { Building } from "./Building";
import { Idea } from "./Idea";
import { Project } from "./Project";
import { UpgradeEffect, PriceUpgradeEffect, RewardUpgradeEffect } from './core';

export default {
    isBuilding(gameObject: GameObject): gameObject is Building {
        return (gameObject as Building).type === 'building';
    },
    isIdea(gameObject: GameObject): gameObject is Idea {
        return (gameObject as Idea).type === 'idea';
    },
    isProject(gameObject: GameObject): gameObject is Project {
        return (gameObject as Project).type === 'project';
    },
    isPriceUpgradeEffect(upgradeEffect: UpgradeEffect): upgradeEffect is PriceUpgradeEffect {
        return typeof (upgradeEffect as PriceUpgradeEffect).type !== 'undefined';
    },
    isRewardUpgradeEffect(upgradeEffect: UpgradeEffect): upgradeEffect is RewardUpgradeEffect {
        return typeof (upgradeEffect as PriceUpgradeEffect).type === 'undefined';
    }
};
