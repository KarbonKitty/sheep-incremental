import { GameEvent, IResourcesData, Lock, Map, Price, UpgradeEffect, IResourcesTemplateData, IResource, CurrencyArray, IResourceTemplate, IndustryBranch } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";
import typeGuards from "./classes/typeGuards";
import { AdvancementData, BuildingData, GoalsData, IdeaData, LocksData, ResourcesData, ExpeditionData } from "./data";

import { getPriceCurrencies, canBePaid } from "./classes/helpers";
import { IBuildingTemplate, IBuildingState, Building } from "./classes/Building";
import { ComplexPrice } from "./classes/complexPrices";
import { Idea, IIdeaState, IIdeaTemplate } from "./classes/Idea";
import eventBus from "./eventBus";
import { Expedition, IExpeditionState, IExpeditionTemplate } from "./classes/Expedition";

interface IProducer extends Building {
    production: ComplexPrice;
}

interface IConsumer extends Building {
    consumption: ComplexPrice;
}

type IProcessor = IProducer & IConsumer;

interface IStorage extends Building {
    storage: ComplexPrice;
}

interface IUpgrade extends Idea {
    effects: UpgradeEffect[];
}

interface IDiscovery extends Idea {
    unlocks: Lock[];
}

export default class GameEngine {
    gainPerSecondIterations = 20;
    lastTick = 0;
    iteration = 0;
    prestiging = false;
    saveGameName = 'sheep-incremental-save-014';

    currentSelection: GameObject;
    currentBranch: IndustryBranch;
    currentGoal: Price;

    locks = {} as Map<boolean>;

    goals = {} as Map<Price>;

    buildings = [] as Building[];
    ideas = [] as Idea[];
    expeditions = [] as Expedition[];

    resources = {} as IResourcesData;

    advancements = [] as Idea[];

    population = { workers: 0, population: 0, housing: 0 };

    constructor() {
        this.init();
        this.currentSelection = this.buildings.filter(b => b.branch === 'housing')[0];
        this.currentBranch = 'housing';
        // TODO: work on goals
        this.currentGoal = this.goals.tribal;

        const savedGame = localStorage.getItem(this.saveGameName);
        if (savedGame !== null) {
            try {
                this.load(savedGame);
                console.log("Game loaded");
            } catch (error) {
                console.error(error);
            }
        }
    }

    get pureProducers(): IProducer[] {
        return this.producers.filter(p => typeof p.consumption === 'undefined');
    }

    get producers(): IProducer[] {
        return this.buildings.filter(b => typeof b.production !== 'undefined') as IProducer[];
    }

    get consumers(): IConsumer[] {
        return this.buildings.filter(b => typeof b.consumption !== 'undefined') as IConsumer[];
    }

    get processors(): IProcessor[] {
        return this.producers.filter(p => typeof p.consumption !== 'undefined') as IProcessor[];
    }

    get storages(): IStorage[] {
        return this.buildings.filter(b => typeof b.storage !== 'undefined') as IStorage[];
    }

    get upgrades(): IUpgrade[] {
        return this.ideas.filter(i => typeof i.template.effects !== 'undefined') as IUpgrade[];
    }

    get discoveries(): IDiscovery[] {
        return this.ideas.filter(i => typeof i.template.unlocks !== 'undefined') as IDiscovery[];
    }

    tick(currentTick: number) {
        let deltaT = currentTick - this.lastTick;

        if (deltaT > 1000) {
            deltaT = 1000;
            this.lastTick += deltaT;
        } else {
            this.lastTick = currentTick;
        }

        this.iteration = (this.iteration + 1) % this.gainPerSecondIterations;
        this.clearPerSecondValues(this.iteration);
        this.activatePureProducers(deltaT);
        this.activateProcessors(deltaT);
        this.proceedWithExpeditions(deltaT);
        this.discardResourcesOverLimit();
    }

    handleEvent(data: { type: GameEvent, value: any }) {
        switch (data.type) {
            case 'buy':
                if (typeof data.value === 'undefined') {
                    throw new Error("Game event data needs to define value!");
                }
                const boughtItem = this.tryBuyItem(data.value);
                if (typeof boughtItem !== 'undefined') {
                    eventBus.$emit('show-toast', `${boughtItem.name} was bought!`);
                    if (typeGuards.isIdea(boughtItem)) {
                        this.resetSelection();
                    }
                }
                break;
            case 'change-selection':
                this.changeSelection(data.value);
                break;
            case 'change-branch':
                this.changeBranchSelection(data.value);
                break;
            case 'prestige':
                if (data.value === 'start') {
                    localStorage.setItem(this.saveGameName, this.save());
                    this.prestige();
                    this.prestiging = true;
                } else if (data.value === 'end') {
                    this.prestiging = false;
                } else {
                    throw new Error("Unknown data for 'prestige' event:" + data.value);
                }
                break;
            case 'disable':
                const item = this.getGameObjectById(data.value);
                if (typeof item !== 'undefined' && typeGuards.isBuilding(item)) {
                    item.disabled = !item.disabled;
                } else {
                    throw new Error(`Object with id ${data.value} is not a producer and cannot be disabled`);
                }
                break;
            default:
                console.error(`Event unhandled: ${data.type}. Reason: no relevant case in a switch!`);
        }
    }

    getAllGameObjects(): GameObject[] {
        let gameObjects = [] as GameObject[];
        gameObjects = gameObjects.concat(this.buildings);
        gameObjects = gameObjects.concat(this.ideas);
        gameObjects = gameObjects.concat(this.advancements);
        gameObjects = gameObjects.concat(this.expeditions);
        return gameObjects;
    }

    getGameObjectById(id: string): GameObject | undefined {
        const gameObjects = this.getAllGameObjects();
        const item = gameObjects.filter(go => go.id === id).pop();
        return item;
    }

    tryBuyItem(itemId: string): GameObject | undefined {
        const item = this.getGameObjectById(itemId);

        if (typeof item === 'undefined' || !typeGuards.isBuyable(item)) {
            return undefined;
        }

        const price = item.currentPrice;

        if (canBePaid(price, this.resources) && this.hasEnoughWorkforce(item)) {
            this.payThePrice(price);
            item.buy();
            return item;
        } else {
            return undefined;
        }
    }

    save(): string {
        const state = {
            lastTick: this.lastTick,
            locks: this.locks,
            resources: this.resources,
            buildingsState: this.buildings.reduce((m: any, b) => { m[b.id] = b.save(); return m; }, {}),
            ideasState: this.ideas.reduce((m: any, i) => { m[i.id] = i.save(); return m; }, {}),
            advancementsState: this.advancements.reduce((m: any, a) => { m[a.id] = a.save(); return m; }, {}),
            population: this.population,
            goal: this.currentGoal
        };

        return JSON.stringify(state);
    }

    load(savedState: string): void {
        const savedObject = JSON.parse(savedState);

        this.lastTick = savedObject.lastTick;

        const buildingDefaultStartingState = { quantity: 0 };
        this.buildings = BuildingData.map(bd => this.createBuilding(bd.template, savedObject.buildingsState[bd.template.id] || bd.startingState || buildingDefaultStartingState));

        const ideaDefaultStartingState = { done: false };
        this.ideas = IdeaData.map(id => this.createIdea(id.template, savedObject.ideasState[id.template.id] || id.startingState || ideaDefaultStartingState));

        this.goals = JSON.parse(JSON.stringify(GoalsData));

        this.advancements = AdvancementData.map(ad => this.createIdea(ad.template, savedObject.advancementsState[ad.template.id] || ad.startingState || ideaDefaultStartingState));

        this.locks = savedObject.locks;
        this.resources = savedObject.resources;
        this.population = savedObject.population;
        this.currentGoal = savedObject.goal;

        this.reapplyIdeas();
        this.recalculatePopulation();
        this.recalculateStorage();

        this.resetSelection();
    }

    // TODO: rethink that
    private init() {
        this.lastTick = Date.now();

        const buildingDefaultStartingState = { quantity: 0 };
        this.buildings = BuildingData.map(bd => this.createBuilding(bd.template, bd.startingState || buildingDefaultStartingState));

        const ideaDefaultStartingState = { done: false };
        this.ideas = IdeaData.map(id => this.createIdea(id.template, id.startingState || ideaDefaultStartingState));

        const expeditionDefaultStartingState = { timesCompleted: 0, timeLeftToComplete: 0 };
        this.expeditions = ExpeditionData.map(ed => this.createExpedition(ed.template, ed.startingState || expeditionDefaultStartingState));

        this.locks = JSON.parse(JSON.stringify(LocksData));
        this.resources = this.createResourcesData(ResourcesData);
        this.goals = JSON.parse(JSON.stringify(GoalsData));

        this.advancements = AdvancementData.map(ad => this.createIdea(ad.template, ad.startingState || ideaDefaultStartingState));

        this.recalculatePopulation();
    }

    private resetSelection(): void {
        const objectsFromCurrentBranch = this.availableObjectsFromBranch(this.currentBranch);
        if (objectsFromCurrentBranch.length > 0) {
            this.currentSelection = objectsFromCurrentBranch[0];
        } else {
            this.currentSelection = this.getAllGameObjects().filter(o => o.isAvailable())[0];
        }
    }

    private getFreePopulation(): number {
        return this.population.population - this.population.workers;
    }

    private hasEnoughWorkforce(item: GameObject): boolean {
        if (typeGuards.isBuilding(item)) {
            return (item.template.employees || 0) <= this.getFreePopulation();
        } else {
            return true;
        }
    }

    private createResourcesData(template: IResourcesTemplateData): IResourcesData {
        const returnObject = {} as IResourcesData;

        CurrencyArray.forEach(c => returnObject[c] = this.createResource(template[c]));

        return returnObject;
    }

    private prestige() {
        const survivors = {
            advancements: this.advancements.slice()
        };

        this.init();
        localStorage.removeItem(this.saveGameName);
        localStorage.setItem(this.saveGameName, this.save());

        this.advancements = survivors.advancements;
        this.advancements.filter(a => a.done).map(a => a.buy());

        // TODO: different amount of points per goal
        this.resources.advancement.amount += 1;

        this.currentSelection = this.buildings[0];
        if (this.resources.advancement.amountSpent === 0) {
            this.currentGoal = this.goals.copper;
        } else {
            this.currentGoal = this.goals.third;
        }
    }

    private removeLock(lock: Lock) {
        this.locks[lock] = true;
        const unlockables = this.getAllGameObjects();
        unlockables.forEach(unlockable => {
            const lockIndex = unlockable.locks.indexOf(lock);
            if (lockIndex > -1) {
                unlockable.locks.splice(lockIndex, 1);
            }
        });
        CurrencyArray.forEach(c => {
            const resource = this.resources[c];
            const lockIndex = resource.locks.indexOf(lock);
            if (lockIndex > -1) {
                resource.locks.splice(lockIndex, 1);
            }
        });
    }

    private activatePureProducers(deltaT: number) {
        this.pureProducers.filter(p => !p.disabled).forEach(producer => {
            this.produce(producer, deltaT);
        });
    }

    private produce(producer: IProducer, deltaT: number) {
        const production = producer.getProduction(deltaT);
        if (typeof production === 'undefined') {
            throw new Error("Producer must return a value of production that is not undefined!");
        }
        this.getPaid(production);
        this.accumulatePerSecondValues(deltaT, production, true);
    }

    private activateProcessors(deltaT: number) {
        this.processors.filter(p => !p.disabled).forEach(producer => {
            const consumption = producer.getConsumption(deltaT);
            if (typeof consumption === 'undefined') {
                throw new Error("Processor must return a value of consumption that is not undefined!");
            }
            this.tryActivateProducer(consumption, producer, deltaT);
        });
    }

    private tryActivateProducer(consumption: Price, producer: IProcessor, deltaT: number): boolean {
        if (!canBePaid(consumption, this.resources)) {
            return false;
        }

        this.payThePrice(consumption);
        this.accumulatePerSecondValues(deltaT, consumption, false);

        this.produce(producer, deltaT);

        return true;
    }

    private accumulatePerSecondValues(deltaT: number, valuePerDelta: Price, isPositive: boolean) {
        getPriceCurrencies(valuePerDelta).forEach(c => {
            this.resources[c].gainPerSecond[this.iteration] += (valuePerDelta[c] || 0) * 1000 / deltaT * (isPositive ? 1 : -1);
        });
    }

    private payThePrice(price: Price) {
        getPriceCurrencies(price).forEach(currency => {
            const currentPrice = (price[currency] || 0);
            this.resources[currency].amount -= currentPrice;
            this.resources[currency].amountSpent += currentPrice;
        });
    }

    private getPaid(price: Price) {
        getPriceCurrencies(price).forEach(currency => {
            this.resources[currency].amount += (price[currency] || 0);
        });
    }

    private discardResourcesOverLimit(): void {
        CurrencyArray.forEach(k => {
            const resource = this.resources[k];
            if (typeof resource.limit !== 'undefined' && resource.limit < resource.amount) {
                resource.amount = resource.limit;
            }
        });
    }

    private changeSelection(itemId: string): boolean {
        const item = this.getGameObjectById(itemId);
        if (typeof item === 'undefined') {
            return false;
        }
        this.currentSelection = item;
        return true;
    }

    private changeBranchSelection(branchName: IndustryBranch): void {
        this.currentBranch = branchName;
    }

    private createIdea(template: IIdeaTemplate, state: IIdeaState): Idea {
        const idea = new Idea(template, state);
        idea.onBuy.push(() => {
            idea.done = true;
            if (typeof idea.template.unlocks !== 'undefined') {
                idea.template.unlocks.forEach(key => this.removeLock(key));
            }
            if (typeof idea.template.effects !== 'undefined') {
                idea.template.effects.forEach(e => this.applyUpgradeEffect(e));
            }
        });
        return idea;
    }

    private createBuilding(template: IBuildingTemplate, state: IBuildingState): Building {
        const building = new Building(template, state);
        building.onBuy.push(() => {
            building.quantity++;
            this.recalculateStorage();
            this.recalculatePopulation();
        });
        return building;
    }

    private createExpedition(template: IExpeditionTemplate, state: IExpeditionState): Expedition {
        const expedition = new Expedition(template, state);
        expedition.onBuy.push(() => {
            expedition.timesCompleted++;
            expedition.getReward().forEach(rewardItem => {
                if (typeof rewardItem === 'string') {
                    const object = this.getGameObjectById(rewardItem);
                    if (typeof object !== 'undefined') {
                        object.buy();
                    } else {
                        throw Error(`Object with id ${rewardItem} doesn't exist and was used as a part of an expedition reward.`);
                    }
                } else {
                    this.getPaid(rewardItem);
                }
            });
        });
        return expedition;
    }

    private createResource(template: IResourceTemplate): IResource {
        return {
            template: template,
            amount: 0,
            gainPerSecond: new Array(this.gainPerSecondIterations).fill(0),
            limit: template.baseLimit,
            locks: template.originalLocks.slice(),
            amountSpent: 0
        };
    }

    private recalculateStorage(): void {
        CurrencyArray.forEach(c => {
            const resource = this.resources[c];
            if (typeof resource.template.baseLimit !== 'undefined') {
                resource.limit = this.storages.reduce((limit, b) => limit += (b.storage.getTotal()[c] || 0) * b.quantity, resource.template.baseLimit || 0);
            }
        });
    }

    private recalculatePopulation(): void {
        this.population.workers = this.buildings.reduce((total, b) => total + (b.template.employees || 0) * b.quantity, 0);
        this.population.housing = this.buildings.reduce((total, b) => total + (b.template.housing || 0) * b.quantity, 0);

        // TODO: when adding happines, remember to change that
        this.population.population = this.population.housing;
    }

    private applyUpgradeEffect(effect: UpgradeEffect) {
        const object = this.getGameObjectById(effect.affectedObjectId);
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

    private availableObjectsFromBranch(branch: string): GameObject[] {
        return this.getAllGameObjects().filter(o => o.branch === branch && o.isAvailable());
    }

    private reapplyIdeas(): void {
        this.ideas.forEach(i => { if (i.done) { i.buy(); } });
    }

    private clearPerSecondValues(iteration: number): void {
        CurrencyArray.forEach(c => this.resources[c].gainPerSecond[iteration] = 0);
    }

    private proceedWithExpeditions(deltaT: number): void {
        this.expeditions.filter(e => e.timeLeftToComplete > 0).forEach(e => e.passTime(deltaT));
    }
}
