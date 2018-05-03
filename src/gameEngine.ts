import { GameEvent, CurrencyValue, Lock, Map } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";
import IBuyable from "./classes/IBuyable";
import typeGuards from "./classes/typeGuards";
import Discovery from "./classes/discovery/Discovery";
import IResource from "./classes/IResource";
import { ProducersData, DiscoveriesData, LocksData } from "./data";
import IDiscoveryTemplate from "./classes/discovery/IDiscoveryTemplate";
import IDiscoveryState from "./classes/discovery/IDiscoveryState";
import Producer from "./classes/producer/Producer";
import IProducerTemplate from "./classes/producer/IProducerTemplate";
import IProducerState from "./classes/producer/IProducerState";

export default class GameEngine {
    lastTick: number;
    currentSelection: GameObject;

    locks: Map<boolean>;

    discoveries: Discovery[];

    producers: Producer[];

    resources: Map<IResource> = {
        cash: { name: "Cash", amount: 100, gainPerSecond: 0, precision: 0 },
        wheat: { name: "Wheat", amount: 100, gainPerSecond: 0, precision: 0, limit: 100 }
    }

    constructor() {
        this.lastTick = Date.now();

        this.producers = ProducersData.map(pd => this.createProducer(pd));

        this.discoveries = DiscoveriesData.map(dd => this.createDiscovery(dd));

        this.currentSelection = this.producers[0];

        this.locks = LocksData;
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

    private createProducer(template: IProducerTemplate, state: IProducerState = { quantity: 0 }): Producer {
        const producer = new Producer(template, state);
        producer.onBuy.push(() => {
            producer.quantity++;
        });
        return producer;
    }

    private createDiscovery(template: IDiscoveryTemplate, state: IDiscoveryState = { done: false }): Discovery {
        const discovery = new Discovery(template, { done: false });
        discovery.onBuy.push(() => {
            discovery.done = true;
            discovery.unlocks.forEach(key => this.removeLock(key));
        });
        return discovery;
    }
}


// TODO: think about the production/consumption ideas

