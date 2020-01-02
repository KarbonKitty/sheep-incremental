import { PriceUpgradeEffect, IResourceTemplate, IResource, ISiteTemplate, ISiteState, ISite, IResourcesData, IResourcesTemplateData, CurrencyArray, ISitesTemplateData, ISitesStateData, ISitesData, SiteTypesArray, RewardUpgradeEffect } from './classes/core';
import GameObject from './classes/gameObject/GameObject';
import typeGuards from './classes/typeGuards';
import { gainPerSecondIterations } from './consts';
import { sumRewards } from './classes/helpers';

const helpers = {
    applyPriceUpgradeEffect(effect: PriceUpgradeEffect, object: GameObject) {
        switch (effect.affectedProperty) {
            case "production":
                if (typeGuards.isBuilding(object) && typeof object.production !== 'undefined') {
                    object.production.addModifier(effect);
                } else {
                    throw new Error(`Object with id: ${object.id} is not a producer and can not have upgrades that improve production.`);
                }
                break;
            case "consumption":
                if (typeGuards.isBuilding(object) && typeof object.consumption !== 'undefined') {
                    object.consumption.addModifier(effect);
                } else {
                    throw new Error(`Object with id: ${object.id} is not a producer and can not have upgrades that improve production.`);
                }
                break;
            case "storage":
                if (typeGuards.isBuilding(object) && typeof object.storage !== 'undefined') {
                    object.storage.addModifier(effect);
                } else {
                    throw new Error(`Object with id: ${object.id} is not a storage building and can not have upgrades that improve storage.`);
                }
            case "cost":
                object.cost.addModifier(effect);
        }
    },
    applyRewardUpgradeEffect(effect: RewardUpgradeEffect, object: GameObject) {
        if (typeGuards.isProject(object)) {
            object.reward = sumRewards(object.reward, effect.scale);
        } else {
            throw new Error(`Object with id: ${object.id} is not a project and doesn't have a reward to be upgraded.`);
        }
    },
    createResource(template: IResourceTemplate): IResource {
        return {
            template: template,
            amount: 0,
            gainPerSecond: new Array(gainPerSecondIterations).fill(0),
            limit: template.baseLimit,
            locks: template.originalLocks.slice(),
            amountSpent: 0
        };
    },
    createSite(template: ISiteTemplate, state: ISiteState = { amount: 0 }): ISite {
        return {
            template: template,
            totalAmount: state.amount,
            locks: template.originalLocks.slice(),
            amountUsed: 0
        };
    },
    createResourcesData(template: IResourcesTemplateData): IResourcesData {
        const returnObject = {} as IResourcesData;

        CurrencyArray.forEach(c => returnObject[c] = helpers.createResource(template[c]));

        return returnObject;
    },
    createSitesData(template: ISitesTemplateData, state: ISitesStateData): ISitesData {
        const returnObject = {} as ISitesData;

        SiteTypesArray.forEach(s => returnObject[s] = helpers.createSite(template[s], state[s]));

        return returnObject;
    }
};

export default helpers;
