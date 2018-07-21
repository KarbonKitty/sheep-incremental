import { GameEvent, IResourcesData, Lock, Map, Price, UpgradeEffect, IResourcesTemplateData, IResource, CurrencyArray, IResourceTemplate, IndustryBranch } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";
import typeGuards from "./classes/typeGuards";
import { AdvancementData, BuildingData, GoalsData, IdeaData, LocksData, ResourcesData } from "./data";

import { getPriceCurrencies, canBePaid } from "./classes/helpers";
import { IBuildingTemplate, IBuildingState, Building } from "./classes/Building";
import { Production } from "./classes/production";
import { Idea, IIdeaState, IIdeaTemplate } from "./classes/Idea";
import eventBus from "./eventBus";

interface IProducer extends Building {
    production: Production;
}

interface IConsumer extends Building {
    consumption: Production;
}

type IProcessor = IProducer & IConsumer;

interface IStorage extends Building {
    storage: Price;
}

interface IUpgrade extends Idea {
    effects: UpgradeEffect[];
}

interface IDiscovery extends Idea {
    unlocks: Lock[];
}

export default class GameEngine {
    lastTick = 0;
    prestiging = false;

    currentSelection: GameObject;
    currentBranch: IndustryBranch;
    currentGoal: Price;

    locks = {} as Map<boolean>;

    goals = {} as Map<Price>;

    buildings = [] as Building[];
    ideas = [] as Idea[];

    resources = {} as IResourcesData;

    advancements = [] as Idea[];

    population = { workers: 0, population: 0, housing: 0 };

    constructor() {
        this.init();
        this.currentSelection = this.buildings.filter(b => b.branch === 'housing')[0];
        this.currentBranch = 'housing';
        // TODO: work on goals
        this.currentGoal = this.goals.tribal;

        const savedGame = localStorage.getItem('industrial-incremental-save');
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

        this.clearPerSecondValues();
        this.activatePureProducers(deltaT);
        this.activateProcessors(deltaT);
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
                    localStorage.setItem('industrial-incremental-save', this.save());
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
            buildingState: this.buildings.map(b => ({ id: b.id, state: b.save() })),
            ideasState: this.ideas.map(i => ({ id: i.id, state: i.save() })),
            advancementsState: this.advancements.map(a => ({ id: a.id, state: a.save() })),
            population: this.population,
            goal: this.currentGoal
        };

        return JSON.stringify(state);
    }

    load(savedState: string): void {
        const savedObject = JSON.parse(savedState);

        // to make this generic, we would need some form of list of all the game object data
        // TODO: when creating mixin-implementation, create a list of all gameObjects and use it here

        const tempIdeas = [] as Idea[];
        savedObject.ideasState.forEach((is: { id: string, state: IIdeaState }) => {
            const ideaData = IdeaData.filter(id => id.template.id === is.id).pop();
            if (typeof ideaData === 'undefined') {
                throw new Error("Unknown idea id:" + is.id);
            }
            tempIdeas.push(this.createIdea(ideaData.template, is.state));
        });

        const tempAdvancements = [] as Idea[];
        savedObject.advancementsState.forEach((as: { id: string, state: IIdeaState }) => {
            const advData = AdvancementData.filter(ad => ad.template.id === as.id).pop();
            if (typeof advData === 'undefined') {
                throw new Error("Unknown advancement id:" + as.id);
            }
            tempAdvancements.push(this.createIdea(advData.template, as.state));
        });

        const tempBuildings = [] as Building[];
        savedObject.buildingState.forEach((bs: { id: string, state: IBuildingState }) => {
            const buildingData = BuildingData.filter(bd => bd.template.id === bs.id).pop();
            if (typeof buildingData === 'undefined') {
                throw new Error("Unknown building id:" + bs.id);
            }
            tempBuildings.push(this.createBuilding(buildingData.template, bs.state));
        });

        // nothing threw, we can replace the state
        this.lastTick = savedObject.lastTick;
        this.locks = savedObject.locks;
        this.resources = savedObject.resources;
        this.buildings = tempBuildings;
        this.ideas = tempIdeas;
        this.currentSelection = this.producers[0];
        this.advancements = tempAdvancements;
        this.population = savedObject.population;
        this.currentGoal = savedObject.goal;
    }

    // TODO: rethink that
    private init() {
        this.lastTick = Date.now();

        this.buildings = BuildingData.map(bd => this.createBuilding(bd.template, bd.startingState));

        this.ideas = IdeaData.map(id => this.createIdea(id.template, id.startingState));

        this.locks = JSON.parse(JSON.stringify(LocksData));
        this.resources = this.createResourcesData(ResourcesData);
        this.goals = JSON.parse(JSON.stringify(GoalsData));

        this.advancements = AdvancementData.map(ad => this.createIdea(ad.template, ad.startingState));

        this.recalculatePopulation();
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
        localStorage.removeItem('industrial-incremental-save');
        localStorage.setItem('industrial-incremental-save', this.save());

        this.advancements = survivors.advancements;
        this.advancements.filter(a => a.done).map(a => a.buy());

        // TODO: different amount of points per goal
        // tslint:disable-next-line:no-string-literal
        this.resources['advancement'].amount += 1;

        this.currentSelection = this.buildings[0];
        if (survivors.advancements[0].done && !survivors.advancements[1].done) {
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
            this.resources[c].gainPerSecond += (valuePerDelta[c] || 0) * 1000 / deltaT * (isPositive ? 1 : -1);
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

    private clearPerSecondValues(): void {
        CurrencyArray.forEach(k => this.resources[k].gainPerSecond = 0);
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

    private createResource(template: IResourceTemplate): IResource {
        return {
            template: template,
            amount: 0,
            gainPerSecond: 0,
            limit: template.baseLimit,
            locks: template.originalLocks.slice(),
            amountSpent: 0
        };
    }

    private recalculateStorage(): void {
        CurrencyArray.forEach(c => {
            const resource = this.resources[c];
            if (typeof resource.template.baseLimit !== 'undefined') {
                resource.limit = this.storages.reduce((limit, b) => limit += (b.storage[c] || 0) * b.quantity, resource.template.baseLimit || 0);
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
                throw new Error('Storage upgrades are not yet implemented');
            case "cost":
                throw new Error('Cost upgrades are not yet implemented');
        }
    }
}
