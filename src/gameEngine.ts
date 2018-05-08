import { GameEvent, CurrencyValue, Lock, Map, IResource } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";
import IBuyable from "./classes/IBuyable";
import typeGuards from "./classes/typeGuards";
import Discovery from "./classes/discovery/Discovery";
import { ProducersData, DiscoveriesData, LocksData, StorageData } from "./data";
import IDiscoveryTemplate from "./classes/discovery/IDiscoveryTemplate";
import IDiscoveryState from "./classes/discovery/IDiscoveryState";
import Producer from "./classes/producer/Producer";
import IProducerTemplate from "./classes/producer/IProducerTemplate";
import IProducerState from "./classes/producer/IProducerState";
import Storage from "./classes/storage/Storage";
import IStorageTemplate from "./classes/storage/IStorageTemplate";
import IStorageState from "./classes/storage/IStorageState";

export default class GameEngine {
    lastTick: number;
    currentSelection: GameObject;

    locks: Map<boolean>;

    discoveries: Discovery[];
    producers: Producer[];
    storages: Storage[];

    resources: Map<IResource> = {
        herbs: { name: "herbs", amount: 25, gainPerSecond: 0, precision: 2, limit: 250, locks: [] },
        wood: { name: "wood", amount: 0, gainPerSecond: 0, precision: 1, limit: 25, locks: [] },
        flint: { name: "flint", amount: 0, gainPerSecond: 0, precision: 1, limit: 10, locks: [] },
        "stone tools": { name: "stone tools", amount: 0, gainPerSecond: 0, precision: 3, limit: 0, locks: ['stone-tools'] },
        grain: { name: "grain", amount: 0, gainPerSecond: 0, precision: 0, limit: 100, locks: ['agriculture'] },
        flour: { name: "flour", amount: 0, gainPerSecond: 0, precision: 1, limit: 0, locks: ['flour'] },
        water: { name: "water", amount: 0, gainPerSecond: 0, precision: 0, limit: 250, locks: ['stone-tools'] },
        bread: { name: "bread", amount: 0, gainPerSecond: 0, precision: 2, limit: 0, locks: ['bread'] }
    }

    constructor() {
        this.lastTick = Date.now();

        this.producers = ProducersData.map(pd => this.createProducer(pd.template, pd.startingState));
        this.discoveries = DiscoveriesData.map(dd => this.createDiscovery(dd.template, dd.startingState));
        this.storages = StorageData.map(sd => this.createStorage(sd.template, sd.startingState));

        this.locks = LocksData;

        this.currentSelection = this.producers[0];
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
            producersState: this.producers.map(p => ({ id: p.id, state: p.save()})),
            discoveriesState: this.discoveries.map(d => ({ id: d.id, state: d.save()})),
            storageState: this.storages.map(s => ({ id: s.id, state: s.save()}))
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

    private accumulatePerSecondValues(deltaT: number, valuePerDelta: CurrencyValue[], isPositive: boolean) {
        valuePerDelta.forEach(gpd => {
            this.resources[gpd.currency].gainPerSecond += gpd.amount * 1000 / deltaT * (isPositive ? 1 : -1);
        })
    }

    private payThePrice(price: CurrencyValue[]) {
        price.forEach(singleCost => {
            this.resources[singleCost.currency].amount -= singleCost.amount;
        });
    }

    private getPaid(price: CurrencyValue[]) {
        price.forEach(val => {
            if (typeof this.resources[val.currency] === 'undefined') {
                console.log(val);
            }
            this.resources[val.currency].amount += val.amount;
        })
    }

    private canBePaid(price: CurrencyValue[]): boolean {
        return price.reduce((acc, cost) => acc && this.resources[cost.currency].amount >= cost.amount, true);
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

    private createProducer(template: IProducerTemplate, state: IProducerState = { quantity: 0, locks: [] }): Producer {
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

    private createStorage(template: IStorageTemplate, state: IStorageState = { quantity: 0, locks: [] }): Storage {
        const storage = new Storage(template, state);
        storage.onBuy.push(() => {
            storage.quantity++;
            template.storage.forEach(s => {
                const res = this.resources[s.currency];
                if (typeof (res.limit) !== 'undefined') {
                    res.limit += s.amount;
                }
            });
        });
        return storage;
    }
}

// TODO: think about the production/consumption ideas
