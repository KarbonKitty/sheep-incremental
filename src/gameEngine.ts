import { IResourcesData, Lock, Map, Price, UpgradeEffect, CurrencyArray, IndustryBranch, ISitesData, SiteTypesArray, ILockable, SiteSet, SiteType } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";
import typeGuards from "./classes/typeGuards";
import { AdvancementData, BuildingData, GoalsData, IdeaData, LocksData, ResourcesData, ExpeditionPlanData, SitesData, SitesStartingData } from "./data";

import { getPriceCurrencies, canBePaid } from "./classes/helpers";
import { Building } from "./classes/Building";
import { Idea } from "./classes/Idea";
import eventBus from "./eventBus";
import { ExpeditionPlan } from "./classes/ExpeditionPlan";
import { gainPerSecondIterations } from './consts';
import { IProducer, IConsumer, IProcessor, IStorage, IUpgrade, IDiscovery, GameEventHandlers, GameState } from './gameEngineInterfaces';
import helpers from './gameEngineHelpers';
import { Expedition } from './classes/Expedition';

export default class GameEngine implements GameEventHandlers, GameState {
    lastTick = 0;
    iteration = 0;
    prestiging = false;
    saveGameName = 'sheep-incremental-save-014';

    currentSelection: GameObject;
    currentBranch: IndustryBranch;
    currentGoal: Price;

    locks = {} as Map<boolean>;

    goals = {} as Map<Price>;

    gameObjects = [] as GameObject[];

    buildings = [] as Building[];
    ideas = [] as Idea[];
    advancements = [] as Idea[];
    expeditionPlans = [] as ExpeditionPlan[];

    expeditions = [] as Expedition[];

    resources = {} as IResourcesData;
    sites = {} as ISitesData;

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

        this.iteration = (this.iteration + 1) % gainPerSecondIterations;
        this.clearPerSecondValues(this.iteration);
        this.activatePureProducers(deltaT);
        this.activateProcessors(deltaT);
        this.proceedWithExpeditions(deltaT);
        this.discardResourcesOverLimit();
    }

    startPrestige() {
        localStorage.setItem(this.saveGameName, this.save());
        this.prestige();
        this.prestiging = true;
    }

    endPrestige() {
        this.prestiging = false;
    }

    disableItem(itemId: string) {
        const item = this.getGameObjectById(itemId);

        if (typeof item !== 'undefined' && typeGuards.isBuilding(item)) {
            item.disabled = !item.disabled;
        } else {
            throw new Error(`Object with id ${itemId} is not a producer and cannot be disabled`);
        }
    }

    buyItem(itemId: string) {
        const boughtItem = this.tryBuyItem(itemId);
        if (typeof boughtItem !== 'undefined') {
            eventBus.$emit('show-message', `${boughtItem.name} was bought!`);
            eventBus.$emit('show-toast', `${boughtItem.name} was bought!`);
            if (typeGuards.isIdea(boughtItem)) {
                this.resetSelection();
            }
        }
    }

    getAllGameObjects(): GameObject[] {
        let gameObjects = [] as GameObject[];
        gameObjects = gameObjects.concat(this.buildings);
        gameObjects = gameObjects.concat(this.ideas);
        gameObjects = gameObjects.concat(this.advancements);
        gameObjects = gameObjects.concat(this.expeditionPlans);
        return gameObjects;
    }

    getGameObjectById(id: string): GameObject | undefined {
        const gameObjects = this.getAllGameObjects();
        const item = gameObjects.filter(go => go.id === id).pop();
        return item;
    }

    save(): string {
        const state = {
            lastTick: this.lastTick,
            locks: this.locks,
            resources: this.resources,
            sites: this.sites,
            buildingsState: this.buildings.reduce((m: any, b) => { m[b.id] = b.save(); return m; }, {}),
            ideasState: this.ideas.reduce((m: any, i) => { m[i.id] = i.save(); return m; }, {}),
            advancementsState: this.advancements.reduce((m: any, a) => { m[a.id] = a.save(); return m; }, {}),
            expeditionPlansState: this.expeditionPlans.reduce((m: any, e) => { m[e.id] = e.save(); return m; }, {}),
            expeditionsState: this.expeditions.map(e => ({ planId: e.plan.id, state: e.save() })),
            population: this.population,
            goal: this.currentGoal
        };

        return JSON.stringify(state);
    }

    changeSelection(itemId: string): boolean {
        const item = this.getGameObjectById(itemId);
        if (typeof item === 'undefined') {
            return false;
        }
        this.currentSelection = item;
        return true;
    }

    changeBranchSelection(branchName: IndustryBranch): void {
        this.currentBranch = branchName;
    }

    load(savedState: string): void {
        const savedObject = JSON.parse(savedState);

        this.lastTick = savedObject.lastTick;

        const buildingDefaultStartingState = { quantity: 0 };
        this.buildings = BuildingData.map(bd => new Building(bd.template, savedObject.buildingsState[bd.template.id] || bd.startingState || buildingDefaultStartingState));

        const ideaDefaultStartingState = { done: false };
        this.ideas = IdeaData.map(id => new Idea(id.template, savedObject.ideasState[id.template.id] || id.startingState || ideaDefaultStartingState));

        const expeditionDefaultStartingState = { timesCompleted: 0 };
        this.expeditionPlans = ExpeditionPlanData.map(epd => new ExpeditionPlan(epd.template, savedObject.expeditionPlansState[epd.template.id] || epd.startingState || expeditionDefaultStartingState));

        // TODO: replace assertion with proper error throwing
        this.expeditions = savedObject.expeditionsState.map((es: any) => new Expedition(this.expeditionPlans.find(ep => ep.id === es.planId)!, es.state));

        this.goals = JSON.parse(JSON.stringify(GoalsData));

        this.advancements = AdvancementData.map(ad => new Idea(ad.template, savedObject.advancementsState[ad.template.id] || ad.startingState || ideaDefaultStartingState));

        this.locks = savedObject.locks;
        this.resources = savedObject.resources;
        this.sites = savedObject.sites;
        this.population = savedObject.population;
        this.currentGoal = savedObject.goal;

        this.reapplyIdeas();
        this.recalculatePopulation();
        this.recalculateStorage();
        this.recalculateSites();

        this.resetSelection();
    }

    private buyGameObject(item: GameObject) {
        if (typeGuards.isIdea(item)) {
            this.buyIdea(item);
        } else if (typeGuards.isBuilding(item)) {
            this.buyBuilding(item);
        } else if (typeGuards.isExpeditionPlan(item)) {
            this.startExpedition(item);
        }
    }

    private buyIdea(idea: Idea) {
        idea.done = true;
        if (typeof idea.template.unlocks !== 'undefined') {
            idea.template.unlocks.forEach(key => this.removeLock(key));
        }
        if (typeof idea.template.effects !== 'undefined') {
            idea.template.effects.forEach(e => this.applyUpgradeEffect(e));
        }
    }

    private buyBuilding(building: Building) {
        building.quantity++;
        this.recalculateStorage();
        this.recalculatePopulation();
        this.recalculateSites();
    }

    private startExpedition(plan: ExpeditionPlan) {
        this.expeditions.push(new Expedition(plan));
    }

    private endExpedition(expedition: Expedition) {
        expedition.plan.timesCompleted++;
        const reward = expedition.plan.getReward();
        this.getPaid(reward.resourceReward);
        this.getSites(reward.sitesReward);
    }

    // TODO: rethink that
    private init() {
        this.lastTick = Date.now();

        const buildingDefaultStartingState = { quantity: 0 };
        this.buildings = BuildingData.map(bd => new Building(bd.template, bd.startingState || buildingDefaultStartingState));

        const ideaDefaultStartingState = { done: false };
        this.ideas = IdeaData.map(id => new Idea(id.template, id.startingState || ideaDefaultStartingState));

        const expeditionDefaultStartingState = { timesCompleted: 0, timeLeftToComplete: 0 };
        this.expeditionPlans = ExpeditionPlanData.map(ed => new ExpeditionPlan(ed.template, ed.startingState || expeditionDefaultStartingState));

        this.locks = JSON.parse(JSON.stringify(LocksData));
        this.resources = helpers.createResourcesData(ResourcesData);
        this.sites = helpers.createSitesData(SitesData, SitesStartingData);
        this.goals = JSON.parse(JSON.stringify(GoalsData));

        this.advancements = AdvancementData.map(ad => new Idea(ad.template, ad.startingState || ideaDefaultStartingState));

        this.gameObjects = this.gameObjects.concat(this.buildings).concat(this.ideas).concat(this.expeditionPlans).concat(this.advancements);

        this.recalculatePopulation();
        this.recalculateSites();
        this.recalculateStorage();
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

    private prestige() {
        // TODO: should we expand on this?
        const survivors = {
            advancements: this.advancements.slice(),
            advancementPoints: this.resources.advancement.amount
        };

        this.init();

        localStorage.removeItem(this.saveGameName);
        localStorage.setItem(this.saveGameName, this.save());

        this.advancements = survivors.advancements;
        this.advancements.filter(a => a.done).forEach(a => this.buyIdea(a));

        // TODO: different amount of points per goal
        this.resources.advancement.amount = survivors.advancementPoints + 1;

        this.currentSelection = this.buildings[0];
        if (this.resources.advancement.amountSpent === 0) {
            this.currentGoal = this.goals.copper;
        } else {
            this.currentGoal = this.goals.third;
        }
    }

    private removeLock(lock: Lock) {
        this.locks[lock] = true;

        const unlock = (item: ILockable) => {
            const lockIndex = item.locks.indexOf(lock);
            if (lockIndex > -1) {
                item.locks.splice(lockIndex, 1);
            }
        };

        const unlockables = this.getAllGameObjects();
        unlockables.forEach(unlockable => unlock(unlockable));

        CurrencyArray.forEach(c => unlock(this.resources[c]));
        SiteTypesArray.forEach(s => unlock(this.sites[s]));
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
        getPriceCurrencies(price).filter(c => this.resources[c].locks.length === 0).forEach(currency => {
            this.resources[currency].amount += (price[currency] || 0);
        });
    }

    private getSites(siteSet: SiteSet) {
        Object.keys(siteSet).forEach(s => {
            if (this.sites[s as SiteType].locks.length === 0) {
                this.sites[s as SiteType].totalAmount += siteSet[s as SiteType]!;
            }
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

    private recalculateSites(): void {
        SiteTypesArray.forEach(s => {
            const site = this.sites[s];
            site.amountUsed = this.buildings.reduce((total, b) => total + (b.template.requiredSite === s ? b.quantity : 0), 0);
        });
    }

    private applyUpgradeEffect(effect: UpgradeEffect) {
        const object = this.getGameObjectById(effect.affectedObjectId);
        if (typeof object === 'undefined') {
            throw new Error(`There is no object with id: ${effect.affectedObjectId}`);
        }

        helpers.applyUpgradeEffect(effect, object);
    }

    private tryBuyItem(itemId: string): GameObject | undefined {
        const item = this.getGameObjectById(itemId);

        if (typeof item === 'undefined') {
            return undefined;
        }

        const price = item.currentPrice;

        if (canBePaid(price, this.resources) && this.hasEnoughWorkforce(item)) {
            this.payThePrice(price);
            this.buyGameObject(item);
            return item;
        } else {
            return undefined;
        }
    }

    private availableObjectsFromBranch(branch: string): GameObject[] {
        return this.getAllGameObjects().filter(o => o.branch === branch && o.isAvailable());
    }

    private clearPerSecondValues(iteration: number): void {
        CurrencyArray.forEach(c => this.resources[c].gainPerSecond[iteration] = 0);
    }

    private proceedWithExpeditions(deltaT: number): void {
        const runningExpeditions = this.expeditions.filter(e => e.timeLeftToComplete > 0);
        this.expeditions = runningExpeditions;
        this.expeditions.forEach(e => this.passExpeditionTime(e, deltaT));
    }

    private passExpeditionTime(expedition: Expedition, deltaT: number) {
        expedition.timeLeftToComplete -= deltaT;
        if (expedition.timeLeftToComplete <= 0) {
            this.endExpedition(expedition);
            expedition.timeLeftToComplete = 0;
        }
        return expedition.timeLeftToComplete;
    }

    private reapplyIdeas(): void {
        this.ideas.filter(i => i.done).forEach(i => this.buyIdea(i));
    }
}
