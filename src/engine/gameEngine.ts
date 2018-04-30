import GameState from "../gameState";
import { GameEvent, CurrencyValue, Lock } from "../classes/baseClasses";
import IGameObject from "../classes/IGameObject";
import IBuyable from "../classes/IBuyable";
import typeGuards from "../classes/typeGuards";
import Producer from "../classes/producer/Producer";

export default {
    tick,
    handleEvent,
    getAllGameObjects,
    getGameObjectById,
    tryBuyItem,
    removeLock
}

function tick(state: GameState, currentTick: number) {
    let deltaT = currentTick - state.lastTick;
    state.lastTick = currentTick;

    clearPerSecondValues(state);
    activateProducers(state, deltaT);
    discardResourcesOverLimit(state);
}

function handleEvent(state: GameState, data: { type: GameEvent, value: any }) {
    switch (data.type) {
        case 'buy':
            tryBuyItem(state, data.value);
            break;
        case 'change-selection':
            changeSelection(state, data.value);
            break;
        default:
            console.error(`Event unhandled: ${data.type}. Reason: no relevant case in a switch!`);
    }
}

function removeLock(state: GameState, lock: Lock) {
    state.locks[lock] = false;
    let unlockables = getAllGameObjects(state);
    unlockables.forEach(unlockable => {
        const lockIndex = unlockable.locks.indexOf(lock);
        if (lockIndex > -1)
        {
            unlockable.locks.splice(lockIndex, 1);
        }
    });
}

function activateProducers(state: GameState, deltaT: number) {
    state.producers.forEach(producer => {
        if (canBePaid(state, producer.getConsumption(deltaT))) {
            activateProducer(state, producer, deltaT);
        }
    });
}

function activateProducer(state: GameState, producer: Producer, deltaT: number) {
    payThePrice(state, producer.getConsumption(deltaT));
    const production = producer.getProduction(deltaT);
    getPaid(state, production);
    accumulatePerSecondValues(state, deltaT, production);
}

function accumulatePerSecondValues(state: GameState, deltaT: number, gainPerDelta: CurrencyValue[]) {
    gainPerDelta.forEach(gpd => {
        state.resources[gpd.currency].gainPerSecond += gpd.amount * 1000 / deltaT;
    })
}

function payThePrice(state: GameState, price: CurrencyValue[]) {
    price.forEach(singleCost => {
        state.resources[singleCost.currency].amount -= singleCost.amount;
    });
}

function getPaid(state: GameState, price: CurrencyValue[]) {
    price.forEach(val => {
        state.resources[val.currency].amount += val.amount;
    })
}

function canBePaid(state: GameState, price: CurrencyValue[]): boolean {
    return price.reduce((acc, cost) => acc && state.resources[cost.currency].amount >= cost.amount, true);
}

function tryBuyItem(state: GameState, itemId: string): IBuyable | undefined {
    const item = getGameObjectById(state, itemId);

    if (typeof item === 'undefined' || !typeGuards.isBuyable(item)) {
        return undefined;
    }

    const price = item.getCurrentPrice();

    if (canBePaid(state, price)) {
        payThePrice(state, price);
        item.buy(state);
        return item;
    } else {
        return undefined;
    }
}

function getAllGameObjects(state: GameState): IGameObject[] {
    let gameObjects = <IGameObject[]>[];
    gameObjects = gameObjects.concat(state.producers);
    gameObjects = gameObjects.concat(state.discoveries);
    return gameObjects;
}

function getGameObjectById(state: GameState, id: string): IGameObject | undefined {
    const gameObjects = getAllGameObjects(state);
    const item = gameObjects.filter(go => go.id === id).pop();
    return item;
}

// TODO: think about the production/consumption ideas

function clearPerSecondValues(state: GameState): void {
    Object.keys(state.resources).forEach(k => state.resources[k].gainPerSecond = 0);
}

function discardResourcesOverLimit(state: GameState): void {
    Object.keys(state.resources).forEach(k => {
        const resource = state.resources[k];
        if (typeof resource.limit !== 'undefined' && resource.limit < resource.amount) {
            resource.amount = resource.limit;
        }
    });
}

function changeSelection(state: GameState, itemId: string): boolean {
    const item = getGameObjectById(state, itemId);
    if (typeof item === 'undefined') {
        return false;
    }
    state.currentSelection = item;
    return true;
}
