import { GameEvent, IResourcesData, Lock, Map, Price, UpgradeEffect, IResourcesTemplateData, Currency, IResource, CurrencyArray, IResourceTemplate } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";
import typeGuards from "./classes/typeGuards";
import { AdvancementData, DiscoveriesData, GoalsData, LocksData, ProducersData, ResourcesData, StorageData, UpgradesData } from "./data";

import { Discovery, IDiscoveryState, IDiscoveryTemplate } from "./classes/discovery/Discovery";
import { Producer, IProducerState, IProducerTemplate } from "./classes/producer/Producer";
import { Storage, IStorageState, IStorageTemplate } from "./classes/storage/Storage";
import { Upgrade, IUpgradeState, IUpgradeTemplate } from "./classes/upgrade/Upgrade";

import { PriceHelper } from "./classes/helpers";
import { IBuildingTemplate, IBuildingState, Building } from "./classes/Building";

export default class GameEngine {
    lastTick = 0;
    toastActivationTime = 0;
    toastMsg = '';
    prestiging = false;

    currentSelection: GameObject;
    currentGoal: Price;

    locks = {} as Map<boolean>;

    goals = {} as Map<Price>;

    oldBuildings = [] as GameObject[];
    buildings = [] as Building[];
    concepts = [] as GameObject[];

    resources = {} as IResourcesData;

    advancements = [] as Discovery[];

    constructor() {
        this.init();
        this.currentSelection = this.oldBuildings[0];
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

    get producers(): Producer[] {
        return this.oldBuildings.filter(b => typeGuards.isProducer(b)) as Producer[];
    }

    get storages(): Storage[] {
        return this.oldBuildings.filter(b => typeGuards.isStorage(b)) as Storage[];
    }

    get upgrades(): Upgrade[] {
        return this.concepts.filter(c => typeGuards.isUpgrade(c)) as Upgrade[];
    }

    get discoveries(): Discovery[] {
        return this.concepts.filter(c => typeGuards.isDiscovery(c)) as Discovery[];
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
        this.activateProducers(deltaT);
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
                    this.toastActivationTime = Date.now();
                    this.toastMsg = `${boughtItem.name} was bought!`;
                }
                break;
            case 'change-selection':
                this.changeSelection(data.value);
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
                if (typeof item !== 'undefined' && typeGuards.isProducer(item)) {
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
        gameObjects = gameObjects.concat(this.oldBuildings);
        gameObjects = gameObjects.concat(this.concepts);
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

        if (this.canBePaid(price)) {
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
            producersState: this.producers.map(p => ({ id: p.id, state: p.save() })),
            discoveriesState: this.discoveries.map(d => ({ id: d.id, state: d.save() })),
            storageState: this.storages.map(s => ({ id: s.id, state: s.save() })),
            upgradesState: this.upgrades.map(u => ({ id: u.id, state: u.save() })),
            advancementsState: this.advancements.map(a => ({ id: a.id, state: a.save() }))
        };

        return JSON.stringify(state);
    }

    load(savedState: string): void {
        const savedObject = JSON.parse(savedState);

        // to make this generic, we would need some form of list of all the game object data
        // TODO: when creating mixin-implementation, create a list of all gameObjects and use it here
        const tempProducers = [] as Producer[];
        savedObject.producersState.forEach((ps: { id: string, state: IProducerState }) => {
            const producerData = ProducersData.filter(pd => pd.template.id === ps.id).pop();
            if (typeof producerData === 'undefined') {
                throw new Error("Unknown producer id: " + ps.id);
            }
            tempProducers.push(this.createProducer(producerData.template, ps.state));
        });

        const tempDiscoveries = [] as Discovery[];
        savedObject.discoveriesState.forEach((ds: { id: string, state: IDiscoveryState }) => {
            const discoveryData = DiscoveriesData.filter(dd => dd.template.id === ds.id).pop();
            if (typeof discoveryData === 'undefined') {
                throw new Error("Unknown discovery id: " + ds.id);
            }
            tempDiscoveries.push(this.createDiscovery(discoveryData.template, ds.state));
        });

        const tempStorage = [] as Storage[];
        savedObject.storageState.forEach((ss: { id: string, state: IProducerState }) => {
            const storageData = StorageData.filter(sd => sd.template.id === ss.id).pop();
            if (typeof storageData === 'undefined') {
                throw new Error("Unknown storage id: " + ss.id);
            }
            tempStorage.push(this.createStorage(storageData.template, ss.state));
        });

        const tempUpgrades = [] as Upgrade[];
        savedObject.upgradesState.forEach((us: { id: string, state: IUpgradeState }) => {
            const upgradeData = UpgradesData.filter(ud => ud.template.id === us.id).pop();
            if (typeof upgradeData === 'undefined') {
                throw new Error("Unknown upgrade id:" + us.id);
            }
            tempUpgrades.push(this.createUpgrade(upgradeData.template, us.state));
        });

        const tempAdvancements = [] as Discovery[];
        savedObject.advancementsState.forEach((as: { id: string, state: IDiscoveryState }) => {
            const advData = AdvancementData.filter(ad => ad.template.id === as.id).pop();
            if (typeof advData === 'undefined') {
                throw new Error("Unknown advancement id:" + as.id);
            }
            tempAdvancements.push(this.createDiscovery(advData.template, as.state));
        });

        // nothing threw, we can replace the state
        this.lastTick = savedObject.lastTick;
        this.locks = savedObject.locks;
        this.resources = savedObject.resources;
        this.oldBuildings = ([] as GameObject[]).concat(tempProducers).concat(tempStorage);
        this.concepts = ([] as GameObject[]).concat(tempUpgrades).concat(tempDiscoveries);
        this.currentSelection = this.producers[0];
        this.advancements = tempAdvancements;
    }

    // TODO: rethink that
    private init() {
        this.lastTick = Date.now();

        this.toastActivationTime = 0;
        this.toastMsg = '';

        this.oldBuildings = (ProducersData.map(pd => this.createProducer(pd.template, pd.startingState)) as GameObject[]).concat(StorageData.map(sd => this.createStorage(sd.template, sd.startingState)));

        this.concepts = (DiscoveriesData.map(dd => this.createDiscovery(dd.template, dd.startingState)) as GameObject[]).concat(UpgradesData.map(ud => this.createUpgrade(ud.template, ud.startingState)));

        this.locks = JSON.parse(JSON.stringify(LocksData));
        this.resources = this.createResourcesData(ResourcesData);
        this.goals = JSON.parse(JSON.stringify(GoalsData));

        this.advancements = AdvancementData.map(ad => this.createDiscovery(ad.template, ad.startingState));
    }

    private createResourcesData(template: IResourcesTemplateData): IResourcesData {
        const returnObject = {} as IResourcesData;

        CurrencyArray.forEach(c => returnObject[c] = this.createResource(template[c]));

        return returnObject;
    }

    private prestige() {
        const survivors = {
            advancements: this.advancements
        };

        this.init();
        localStorage.removeItem('industrial-incremental-save');
        localStorage.setItem('industrial-incremental-save', this.save());

        this.advancements = survivors.advancements;

        // TODO: different amount of points per goal
        // tslint:disable-next-line:no-string-literal
        this.resources['advancement'].amount += 1;

        this.currentSelection = this.oldBuildings[0];
        this.currentGoal = this.goals.copper;
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

    private removeLocksFromObjects() {
        const openLocks = Object.keys(this.locks).filter(l => this.locks[l]) as Lock[];
        openLocks.forEach(ol => this.removeLock(ol));
    }

    private activateProducers(deltaT: number) {
        this.producers.filter(p => !p.disabled).forEach(producer => {
            if (this.canBePaid(producer.getConsumption(deltaT))) {
                this.activateProducer(producer, deltaT);
            }
        });
    }

    private activateProducer(producer: Producer, deltaT: number) {
        const consumption = producer.getConsumption(deltaT);
        this.payThePrice(consumption);
        this.accumulatePerSecondValues(deltaT, consumption, false);
        const production = producer.getProduction(deltaT);
        this.getPaid(production);
        this.accumulatePerSecondValues(deltaT, production, true);
    }

    private accumulatePerSecondValues(deltaT: number, valuePerDelta: Price, isPositive: boolean) {
        PriceHelper.getPriceCurrencies(valuePerDelta).forEach(c => {
            this.resources[c].gainPerSecond += (valuePerDelta[c] || 0) * 1000 / deltaT * (isPositive ? 1 : -1);
        });
    }

    private payThePrice(price: Price) {
        PriceHelper.getPriceCurrencies(price).forEach(currency => {
            this.resources[currency].amount -= (price[currency] || 0);
        });
    }

    private getPaid(price: Price) {
        PriceHelper.getPriceCurrencies(price).forEach(currency => {
            this.resources[currency].amount += (price[currency] || 0);
        });
    }

    private canBePaid(price: Price): boolean {
        return PriceHelper.canBePaid(price, this.resources);
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

    private createProducer(template: IProducerTemplate, state: IProducerState): Producer {
        const producer = new Producer(template, state);
        producer.onBuy.push(() => {
            producer.quantity++;
        });
        return producer;
    }

    private createDiscovery(template: IDiscoveryTemplate, state: IDiscoveryState): Discovery {
        const discovery = new Discovery(template, state);
        discovery.onBuy.push(() => {
            discovery.done = true;
            discovery.unlocks.forEach(key => this.removeLock(key));
            // after discovering it once, we should stop showing it
            this.currentSelection = this.producers.filter(p => p.locks.length === 0)[0];
        });
        return discovery;
    }

    private createStorage(template: IStorageTemplate, state: IStorageState): Storage {
        const storage = new Storage(template, state);
        storage.onBuy.push(() => {
            storage.quantity++;
            PriceHelper.getPriceCurrencies(template.storage).forEach(k => {
                const res = this.resources[k];
                if (typeof (res.limit) !== 'undefined') {
                    res.limit += (template.storage[k] || 0);
                }
            });
        });
        return storage;
    }

    private createUpgrade(template: IUpgradeTemplate, state: IUpgradeState): Upgrade {
        const upgrade = new Upgrade(template, state);
        upgrade.onBuy.push(() => {
            upgrade.done = true;
            upgrade.effects.forEach(e => {
                this.applyUpgradeEffect(e);
            });
        });
        return upgrade;
    }

    private createBuilding(template: IBuildingTemplate, state: IBuildingState): Building {
        const building = new Building(template, state);
        building.onBuy.push(() => {
            building.quantity++;
            this.recalculateStorage();
        });
        return building;
    }

    private createResource(template: IResourceTemplate): IResource {
        return {
            template: template,
            amount: 0,
            gainPerSecond: 0,
            limit: template.baseLimit,
            locks: template.originalLocks.slice()
        };
    }

    private recalculateStorage(): void {
        CurrencyArray.forEach(c => {
            const resource = this.resources[c];
            if (typeof resource.template.baseLimit !== 'undefined') {
                resource.limit = this.buildings.filter(b => typeof b.storage !== 'undefined' && typeof b.storage[c] !== 'undefined').reduce((limit, b) => limit += ((b.storage as Price)[c] as number), resource.template.baseLimit || 0);
            }
        });
    }

    private applyUpgradeEffect(effect: UpgradeEffect) {
        const object = this.getGameObjectById(effect.affectedObjectId);
        if (typeof object === 'undefined') {
            throw new Error(`There is no object with id: ${effect.affectedObjectId}`);
        }

        switch (effect.affectedProperty) {
            case "production":
                if (typeGuards.isProducer(object)) {
                    object.production.addModifier(effect);
                } else {
                    throw new Error(`Object with id: ${object.id} is not a producer and can not have upgrades that improve production.`);
                }
                break;
            case "consumption":
                if (typeGuards.isProducer(object)) {
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
