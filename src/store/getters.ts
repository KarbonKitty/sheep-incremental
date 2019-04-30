import { GetterTree } from 'vuex';
import GameState from './state';
import { IProducer, IConsumer, IProcessor, IStorage, IUpgrade, IDiscovery } from './interfaces';
import GameObject from '@/classes/gameObject/GameObject';
import { getPriceCurrencies } from '@/classes/helpers';
import { Price, IndustryBranch } from '@/classes/baseClasses';
import typeGuards from '@/classes/typeGuards';

export const stateGetters: GetterTree<GameState, GameState> = {
    producers: state => {
        return state.buildings.filter(b => typeof b.production !== 'undefined') as IProducer[];
    },
    pureProducers: (_, getters) => {
        return (getters.producers as IProducer[]).filter(p => typeof p.consumption === 'undefined');
    },
    consumers: state => {
        return state.buildings.filter(b => typeof b.consumption !== 'undefined') as IConsumer[];
    },
    processors: (_, getters) => {
        return (getters.producers as IProducer[]).filter(b => typeof b.consumption !== 'undefined') as IProcessor[];
    },
    storages: state => {
        return state.buildings.filter(b => typeof b.storage !== 'undefined') as IStorage[];
    },
    upgrades: state => {
        return state.ideas.filter(i => typeof i.template.effects !== 'undefined') as IUpgrade[];
    },
    discoveries: state => {
        return state.ideas.filter(i => typeof i.template.unlocks !== 'undefined') as IDiscovery[];
    },
    getAllGameObjects: state => {
        let gameObjects = [] as GameObject[];
        gameObjects = gameObjects.concat(state.buildings).concat(state.ideas).concat(state.advancements).concat(state.expeditions);
        return gameObjects;
    },
    getGameObjectById: (state, getters) => (id: string) => {
        return (getters.getAllGameObjects as GameObject[]).filter(go => go.id === id).pop();
    },
    freePopulation: state => {
        return state.population.population = state.population.workers;
    },
    canBePaid: state => (price: Price) => {
        return getPriceCurrencies(price).reduce((acc: boolean, cur) => acc && state.resources[cur].amount >= (price[cur] || 0), true);
    },
    hasEnoughWorkforce: (_, getters) => (item: GameObject) => {
        if (!typeGuards.isBuilding(item)) {
            return true;
        } else {
            return (item.template.employees || 0) <= getters.freePopulation;
        }
    },
    canBeBought: (_, getters) => (item: GameObject) => {
        const enoughResources = getters.canBePaid(item.currentPrice) as boolean;
        const enoughPopulation = getters.hasEnoughWorkforce(item) as boolean;
        return enoughPopulation && enoughResources;
    },
    availableObjectsFromBranch: (_, getters) => (branch: IndustryBranch) => {
        return (getters.getAllGameObjects as GameObject[]).filter(o => o.branch === branch && o.isAvailable());
    }
};
