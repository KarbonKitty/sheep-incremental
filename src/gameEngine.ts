import { GameEvent, Lock, Map, Price, IResourcesData, UpgradeEffect } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";
import IBuyable from "./classes/IBuyable";
import typeGuards from "./classes/typeGuards";
import Discovery from "./classes/discovery/Discovery";
import { ProducersData, DiscoveriesData, LocksData, StorageData, ResourcesData, GoalsData, UpgradesData } from "./data";
import IDiscoveryTemplate from "./classes/discovery/IDiscoveryTemplate";
import IDiscoveryState from "./classes/discovery/IDiscoveryState";
import Producer from "./classes/producer/Producer";
import IProducerTemplate from "./classes/producer/IProducerTemplate";
import IProducerState from "./classes/producer/IProducerState";
import Storage from "./classes/storage/Storage";
import IStorageTemplate from "./classes/storage/IStorageTemplate";
import IStorageState from "./classes/storage/IStorageState";
import Upgrade from "./classes/upgrade/Upgrade";
import IUpgradeTemplate from "./classes/upgrade/IUpgradeTemplate";
import IUpgradeState from "./classes/upgrade/IUpgradeState";
import { PriceHelper } from "./classes/helpers";

export default class GameEngine {
    lastTick: number;
    currentSelection: GameObject;
    currentGoal: Price;

    locks: Map<boolean>;

    goals: Map<Price>;

    discoveries: Discovery[];
    producers: Producer[];
    storages: Storage[];
    upgrades: Upgrade[];

    resources: IResourcesData;

    constructor() {
        this.lastTick = Date.now();

        this.producers = ProducersData.map(pd => this.createProducer(pd.template, pd.startingState));
        this.discoveries = DiscoveriesData.map(dd => this.createDiscovery(dd.template, dd.startingState));
        this.storages = StorageData.map(sd => this.createStorage(sd.template, sd.startingState));
        this.upgrades = UpgradesData.map(ud => this.createUpgrade(ud.template, ud.startingState));

        this.locks = LocksData;
        this.resources = ResourcesData;
        this.goals = GoalsData;

        this.currentSelection = this.producers[0];
        this.currentGoal = this.goals.tribal;
    }

    tick(currentTick: number) {
        let deltaT = currentTick - this.lastTick;
        this.lastTick = currentTick;

        this.clearPerSecondValues();
        this.activateProducers(deltaT);
        this.discardResourcesOverLimit();
    }

    handleEvent(data: { type: GameEvent, value: any }) {
        switch (data.type) {
            case 'buy':
                this.tryBuyItem(data.value);
                break;
            case 'change-selection':
                this.changeSelection(data.value);
                break;
            default:
                console.error(`Event unhandled: ${data.type}. Reason: no relevant case in a switch!`);
        }
    }

    getAllGameObjects(): GameObject[] {
        let gameObjects = <GameObject[]>[];
        gameObjects = gameObjects.concat(this.producers);
        gameObjects = gameObjects.concat(this.discoveries);
        gameObjects = gameObjects.concat(this.storages);
        gameObjects = gameObjects.concat(this.upgrades);
        return gameObjects;
    }

    getGameObjectById(id: string): GameObject | undefined {
        const gameObjects = this.getAllGameObjects();
        const item = gameObjects.filter(go => go.id === id).pop();
        return item;
    }

    tryBuyItem(itemId: string): IBuyable | undefined {
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

    removeLock(lock: Lock) {
        this.locks[lock] = false;
        let unlockables = this.getAllGameObjects();
        unlockables.forEach(unlockable => {
            const lockIndex = unlockable.locks.indexOf(lock);
            if (lockIndex > -1) {
                unlockable.locks.splice(lockIndex, 1);
            }
        });
        Object.keys(this.resources).forEach(k => {
            let resource = this.resources[k];
            const lockIndex = resource.locks.indexOf(lock);
            if (lockIndex > -1) {
                resource.locks.splice(lockIndex, 1);
            }
        });
    }

    save(): string {
        const state = {
            lastTick: this.lastTick,
            locks: this.locks,
            resources: this.resources,
            producersState: this.producers.map(p => ({ id: p.id, state: p.save() })),
            discoveriesState: this.discoveries.map(d => ({ id: d.id, state: d.save() })),
            storageState: this.storages.map(s => ({ id: s.id, state: s.save() }))
        };

        return JSON.stringify(state);
    }

    load(savedState: string): void {
        let savedObject = JSON.parse(savedState);

        // to make this generic, we would need some form of list of all the game object data
        // TODO: when creating mixin-implementation, create a list of all gameObjects and use it here
        let tempProducers = <Producer[]>[];
        savedObject.producersState.forEach((ps: { id: string, state: IProducerState }) => {
            const producerData = ProducersData.filter(pd => pd.template.id === ps.id).pop();
            if (typeof producerData === 'undefined') {
                throw new Error("Unknown producer id: " + ps.id);
            }
            tempProducers.push(this.createProducer(producerData.template, ps.state));
        });

        let tempDiscoveries = <Discovery[]>[];
        savedObject.discoveriesState.forEach((ds: { id: string, state: IDiscoveryState }) => {
            const discoveryData = DiscoveriesData.filter(dd => dd.template.id === ds.id).pop();
            if (typeof discoveryData === 'undefined') {
                throw new Error("Unknown discovery id: " + ds.id);
            }
            tempDiscoveries.push(this.createDiscovery(discoveryData.template, ds.state));
        });

        let tempStorage = <Storage[]>[];
        savedObject.storageState.forEach((ss: { id: string, state: IProducerState }) => {
            const storageData = StorageData.filter(sd => sd.template.id === ss.id).pop();
            if (typeof storageData === 'undefined') {
                throw new Error("Unknown storage id: " + ss.id);
            }
            tempStorage.push(this.createStorage(storageData.template, ss.state));
        });

        // nothing threw, we can replace the state
        this.lastTick = savedObject.lastTick;
        this.locks = savedObject.locks;
        this.resources = savedObject.resources;
        this.producers = tempProducers;
        this.discoveries = tempDiscoveries;
        this.storages = tempStorage;
        this.currentSelection = this.producers[0];
    }

    private activateProducers(deltaT: number) {
        this.producers.forEach(producer => {
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
        Object.keys(valuePerDelta).forEach(k => {
            this.resources[k].gainPerSecond += (valuePerDelta[k] || 0) * 1000 / deltaT * (isPositive ? 1 : -1);
        });
    }

    private payThePrice(price: Price) {
        Object.keys(price).forEach(currency => {
            this.resources[currency].amount -= (price[currency] || 0);
        })
    }

    private getPaid(price: Price) {
        Object.keys(price).forEach(currency => {
            this.resources[currency].amount += (price[currency] || 0);
        })
    }

    private canBePaid(price: Price): boolean {
        return Object.keys(price).reduce((acc, cur) => acc && this.resources[cur].amount >= (price[cur] || 0), true);
    }

    private clearPerSecondValues(): void {
        Object.keys(this.resources).forEach(k => this.resources[k].gainPerSecond = 0);
    }

    private discardResourcesOverLimit(): void {
        Object.keys(this.resources).forEach(k => {
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
            Object.keys(template.storage).forEach(k => {
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

    private applyUpgradeEffect(effect: UpgradeEffect) {
        const object = this.getGameObjectById(effect.affectedObjectId);
        if (typeof object === 'undefined') {
            throw new Error(`There is no object with id: ${effect.affectedObjectId}`);
        }

        switch (effect.affectedProperty) {
            case "production":
                if (!typeGuards.isProducer(object)) {
                    throw new Error(`Object with id: ${object.id} is not a producer and can not have upgrades that improve production.`);
                } else {
                    if (effect.type === 'add') {
                        object.baseProduction = PriceHelper.sumPrices(object.baseProduction, effect.scale);
                    } else if (effect.type === 'mul') {
                        object.productionMultiplier = PriceHelper.multiplyPrices(object.productionMultiplier, effect.scale);
                    } else {
                        throw new Error(`Unknown effect type: ${effect.type}`);
                    }
                }
                break;
            case "consumption":
                if (!typeGuards.isProducer(object)) {
                    throw new Error(`Object with id: ${object.id} is not a producer and can not have upgrades that improve consumption.`);
                } else {
                    if (effect.type === 'add') {
                        object.baseConsumption = PriceHelper.sumPrices(object.baseConsumption, effect.scale);
                    } else if (effect.type === 'mul') {
                        object.consumptionMultiplier = PriceHelper.multiplyPrices(object.consumptionMultiplier, effect.scale);
                    } else {
                        throw new Error(`Unknown effect type: ${effect.type}`);
                    }
                }
                break;
            case "storage":
                throw new Error('Storage upgrades are not yet implemented');
            case "cost":
                throw new Error('Cost upgrades are not yet implemented');
        }
    }
}

// TODO: think about the production/consumption ideas
