import { IIdeaTemplate, IIdeaState, Idea } from '@/classes/Idea';
import { IBuildingTemplate, IBuildingState, Building } from '@/classes/Building';
import { IExpeditionTemplate, IExpeditionState, Expedition } from '@/classes/Expedition';
import { IResourceTemplate, IResource, UpgradeEffect } from '@/classes/baseClasses';
import store from '../store/store';
import typeGuards from '@/classes/typeGuards';
import GameObject from '@/classes/gameObject/GameObject';

export class GameObjectFactory {
    createIdea(template: IIdeaTemplate, state: IIdeaState): Idea {
        const idea = new Idea(template, state);
        idea.onBuy.push(() => {
            idea.done = true;
            if (typeof idea.template.unlocks !== 'undefined') {
                idea.template.unlocks.forEach(key => store.dispatch('removeLock', key));
            }
            if (typeof idea.template.effects !== 'undefined') {
                idea.template.effects.forEach(e => store.dispatch('applyUpgradeEffect', e));
            }
        });
        return idea;
    }

    createBuilding(template: IBuildingTemplate, state: IBuildingState): Building {
        const building = new Building(template, state);
        building.onBuy.push(() => {
            building.quantity++;
            store.dispatch('recalculateStorage');
            store.dispatch('recalculatePopulation');
            // this.recalculateStorage();
            // this.recalculatePopulation();
        });
        return building;
    }

    createExpedition(template: IExpeditionTemplate, state: IExpeditionState): Expedition {
        const expedition = new Expedition(template, state);
        expedition.onBuy.push(() => {
            expedition.timesCompleted++;
            expedition.getReward().forEach(rewardItem => {
                if (typeof rewardItem === 'string') {
                    const object = store.getters.getGameObjectById(rewardItem);
                    if (typeof object !== 'undefined') {
                        object.buy();
                    } else {
                        throw Error(`Object with id ${rewardItem} doesn't exist and was used as a part of an expedition reward.`);
                    }
                } else {
                    //.getPaid(rewardItem);
                    store.dispatch('getPaid', rewardItem);
                }
            });
        });
        return expedition;
    }

    createResource(template: IResourceTemplate): IResource {
        return {
            template: template,
            amount: 0,
            gainPerSecond: new Array(store.state.gainPerSecondIterations).fill(0),
            limit: template.baseLimit,
            locks: template.originalLocks.slice(),
            amountSpent: 0
        };
    }

    private applyUpgradeEffect(effect: UpgradeEffect) {
        const object = store.getters.getGameObjectById(effect.affectedObjectId) as GameObject;
        if (typeof object === 'undefined') {
            throw new Error(`There is no object with id: ${effect.affectedObjectId}`);
        }

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
    }
}
