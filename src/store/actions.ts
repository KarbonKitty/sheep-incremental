import { ActionTree } from 'vuex';
import GameState from './state';
import { BuildingData, IdeaData, AdvancementData, GoalsData, LocksData, ResourcesData, ExpeditionData } from '@/data';
import { GameObjectFactory } from '../helpers/factories';
import typeGuards from '@/classes/typeGuards';
import { IndustryBranch, CurrencyArray, IResourcesData, IResourcesTemplateData, Lock, Price } from '@/classes/baseClasses';
import GameObject from '@/classes/gameObject/GameObject';
import { IStorage, IProducer, IProcessor } from './interfaces';

const goFactory = new GameObjectFactory();

export const stateActions: ActionTree<GameState, GameState> = {
    async build({ getters, state, commit, dispatch }) {
        await dispatch('init');
        commit('construct');
        // try load game
    },

    load({ state, dispatch }, savedState: string) {
        const savedObject = JSON.parse(savedState);

        state.lastTick = savedObject.lastTick;

        const buildingDefaultStartingState = { quantity: 0 };
        state.buildings = BuildingData.map(bd => goFactory.createBuilding(bd.template, savedObject.buildingsState[bd.template.id] || bd.startingState || buildingDefaultStartingState));

        const ideaDefaultStartingState = { done: false };
        state.ideas = IdeaData.map(id => goFactory.createIdea(id.template, savedObject.ideasState[id.template.id] || id.startingState || ideaDefaultStartingState));

        state.goals = JSON.parse(JSON.stringify(GoalsData));

        state.advancements = AdvancementData.map(ad => goFactory.createIdea(ad.template, savedObject.advancementsState[ad.template.id] || ad.startingState || ideaDefaultStartingState));

        state.locks = savedObject.locks;
        state.resources = savedObject.resources;
        state.population = savedObject.population;
        state.currentGoal = savedObject.goal;

        dispatch('reapplyIdeas');
        dispatch('recalculatePopulation');
        dispatch('recalculateStorage');

        dispatch('resetSelection');
        // this.reapplyIdeas();
        // this.recalculatePopulation();
        // this.recalculateStorage();

        // this.resetSelection();
    },

    tick({ state, dispatch, commit }, currentTick: number) {
        let deltaT = currentTick - state.lastTick;

        if (deltaT > 1000) {
            deltaT = 1000;
            state.lastTick += deltaT;
        } else {
            state.lastTick = currentTick;
        }

        state.iteration = (state.iteration + 1) % state.gainPerSecondIterations;
        dispatch('clearPerSecondValues', state.iteration);
        dispatch('activatePureProducers', deltaT);
        dispatch('activateProcessors', deltaT);
        commit('proceedWithExpeditions', deltaT);
        dispatch('discardResourcesOverLimit');
    },

    async buy({ state, dispatch }, itemId: string) {
        const boughtItem = await dispatch('tryBuyItem', itemId);

        if (typeof boughtItem !== 'undefined') {
            // show toast
            if (typeGuards.isIdea(boughtItem)) {
                dispatch('resetSelection');
            }
        }
    },

    changeSelection({ state, getters }, itemId: string) {
        const item = getters.getGameObjectById(itemId);
        if (typeof item === 'undefined') {
            return false;
        }
        state.currentSelection = item;
        return true;
    },
    changeBranchSelection({ state }, branchName: IndustryBranch) {
        state.currentBranch = branchName;
    },
    async prestige({ state, dispatch }) {
        const survivors = {
            advancements: state.advancements.slice()
        };

        dispatch('init');
        localStorage.removeItem(state.saveGameName);
        localStorage.setItem(state.saveGameName, await dispatch('save'));

        state.advancements = survivors.advancements;
        state.advancements.filter(a => a.done).map(a => a.buy());

        // TODO: different amount of points per goal
        state.resources.advancement.amount += 1;

        state.currentSelection = state.buildings[0];

        if (state.resources.advancement.amountSpent === 0) {
            state.currentGoal = state.goals.copper;
        } else {
            state.currentGoal = state.goals.third;
        }
    },
    async startPrestiging({ state, dispatch }) {
        localStorage.setItem(state.saveGameName, await dispatch('save'));
        state.prestiging = true;
        dispatch('prestige');
    },
    endPrestige({ state }) {
        state.prestiging = false;
    },
    disable({ getters }, itemId: string) {
        const item = getters.getGameObjectById(itemId) as GameObject;
        if (typeof item !== 'undefined' && typeGuards.isBuilding(item)) {
            item.disabled = !item.disabled;
        } else {
            throw new Error(`Object with id ${itemId} is not a producer and cannot be disabled`);
        }
    },
    tryBuyItem({ getters, dispatch }, itemId: string) {
        const item = getters.getGameObjectById(itemId) as GameObject;

        if (typeof item === 'undefined' || !typeGuards.isBuyable(item)) {
            return undefined;
        }

        if (getters.canBeBought(item)) {
            dispatch('payThePrice', item.currentPrice);
            item.buy();
            return item;
        } else {
            return undefined;
        }
    },
    save({ state }) {
        const s = {
            lastTick: state.lastTick,
            locks: state.locks,
            resources: state.resources,
            buildingState: state.buildings.reduce((m: any, b) => { m[b.id] = b.save(); return m; }, {}),
            ideasState: state.ideas.reduce((m: any, i) => { m[i.id] = i.save(); return m; }, {}),
            advancementsState: state.advancements.reduce((m: any, a) => { m[a.id] = a.save(); return m; }, {}),
            population: state.population,
            goal: state.currentGoal
        };

        return JSON.stringify(s);
    },
    // TODO: rethink that
    async init({ state, dispatch }) {
        state.lastTick = Date.now();

        const buildingDefaultStartingState = { quantity: 0 };
        state.buildings = BuildingData.map(bd => goFactory.createBuilding(bd.template, bd.startingState || buildingDefaultStartingState));

        const ideaDefaultStartingState = { done: false };
        state.ideas = IdeaData.map(id => goFactory.createIdea(id.template, id.startingState || ideaDefaultStartingState));

        const expeditionDefaultStartingState = { timesCompleted: 0, timeLeftToComplete: 0 };
        state.expeditions = ExpeditionData.map(ed => goFactory.createExpedition(ed.template, ed.startingState || expeditionDefaultStartingState));

        state.locks = JSON.parse(JSON.stringify(LocksData));
        state.resources = await dispatch('createResourcesData', ResourcesData);
        state.goals = JSON.parse(JSON.stringify(GoalsData));

        state.advancements = AdvancementData.map(ad => goFactory.createIdea(ad.template, ad.startingState || ideaDefaultStartingState));

        dispatch('recalculatePopulation');
    },
    recalculatePopulation({ state }) {
        state.population.workers = state.buildings.reduce((total, b) => total + (b.template.employees || 0) * b.quantity, 0);
        state.population.housing = state.buildings.reduce((total, b) => total + (b.template.housing || 0) * b.quantity, 0);

        // TODO: when adding happines, remember to change that
        state.population.population = state.population.housing;
    },
    discardResourcesOverLimit({ state }) {
        CurrencyArray.forEach(k => {
            const resource = state.resources[k];
            if (typeof resource.limit !== 'undefined' && resource.limit < resource.amount) {
                resource.amount = resource.limit;
            }
        });
    },
    recalculateStorage( { state, getters }) {
        CurrencyArray.forEach(c => {
            const resource = state.resources[c];
            if (typeof resource.template.baseLimit !== 'undefined') {
                resource.limit = (getters.storages as IStorage[]).reduce((limit, b) => limit += (b.storage.getTotal()[c] || 0) * b.quantity, resource.template.baseLimit || 0);
            }
        });
    },
    async createResourcesData({ state }, template: IResourcesTemplateData) {
        const returnObject = {} as IResourcesData;

        CurrencyArray.forEach(c => returnObject[c] = goFactory.createResource(template[c]));

        return returnObject;
    },
    resetSelection({ state, getters }) {
        const objectsFromCurrentBranch = getters.availableObjectsFromBranch(state.currentBranch) as GameObject[];
        if (objectsFromCurrentBranch.length > 0) {
            state.currentSelection = objectsFromCurrentBranch[0];
        } else {
            state.currentSelection = (getters.getAllGameObjects as GameObject[]).filter(o => o.isAvailable())[0];
        }
    },
    removeLock({ state, getters }, lock: Lock) {
        state.locks[lock] = true;
        const unlockables = getters.getAllGameObjects as GameObject[];
        unlockables.forEach(unlockable => {
            const lockIndex = unlockable.locks.indexOf(lock);
            if (lockIndex > -1) {
                unlockable.locks.splice(lockIndex, 1);
            }
        });
        CurrencyArray.forEach(c => {
            const resource = state.resources[c];
            const lockIndex = resource.locks.indexOf(lock);
            if (lockIndex > -1) {
                resource.locks.splice(lockIndex, 1);
            }
        });
    },
    clearPerSecondValues({ state }, iteration: number) {
        CurrencyArray.forEach(c => state.resources[c].gainPerSecond[iteration] = 0);
    },
    activatePureProducers({ state, getters, dispatch }, deltaT: number) {
        (getters.pureProducers as IProducer[]).filter(p => !p.disabled).forEach(producer => {
            dispatch('produce', { producer, deltaT });
        });
    },
    produce({ commit }, payload: { producer: IProducer, deltaT: number }) {
        const production = payload.producer.getProduction(payload.deltaT);
        if (typeof production === 'undefined') {
            throw new Error("Producer must return a value of production that is not undefined!");
        }

        commit('getPaid', production);
        commit('accumulatePerSecondValues', { deltaT: payload.deltaT, valuePerDelta: production, isPositive: true });
    },
    activateProcessors({ getters, dispatch }, deltaT: number) {
        (getters.processors as IProcessor[]).filter(p => !p.disabled).forEach(producer => {
            const consumption = producer.getConsumption(deltaT);
            if (typeof consumption === 'undefined') {
                throw new Error("Processor must return a value for consumption!");
            }
            dispatch('tryActivateProducer', { consumption, producer, deltaT });
        });
    },
    tryActivateProducer({ dispatch, getters, commit }, payload: { consumption: Price, producer: IProcessor, deltaT: number }) {
        if (!(getters.canBePaid(payload.consumption))) {
            return false;
        }

        commit('payThePrice', payload.consumption);
        commit('accumulatePerSecondValues', { deltaT: payload.deltaT, valuePerDelta: payload.consumption, isPositive: false });

        dispatch('produce', { producer: payload.producer, deltaT: payload.deltaT });
    },
    reapplyIdeas({ state }) {
        state.ideas.forEach(i => { if (i.done) { i.buy(); } });
    }
};
