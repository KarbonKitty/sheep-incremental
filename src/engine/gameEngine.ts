import GameState from "../gameState"
import ProducerEngine from "./producerEngine";
import { GameEvent, CurrencyValue } from "../classes/baseClasses";
import IGameObject from "../classes/IGameObject";
import DiscoveryEngine from "./discoveryEngine";
import IBuyable from "../classes/IBuyable";
import typeGuards from "../classes/typeGuards";

export default {
    tick,
    handleEvent,
    getAllGameObjects,
    getGameObjectById,
    tryBuyItem
}

function tick(state: GameState, currentTick: number) {
    let deltaT = currentTick - state.lastTick;
    state.lastTick = currentTick;

    clearPerSecondValues(state);
    ProducerEngine.activateProducers(state, deltaT);
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
        case 'discover':
            DiscoveryEngine.tryDiscover(state, data.value);
            break;
        default:
            console.error(`Event unhandled: ${data.type}. Reason: no relevant case in a switch!`);
    }
}

function payForItem(state: GameState, item: IBuyable): void {
    const realCost = item.getCurrentPrice();
    realCost.forEach(singleCost => {
        state.resources[singleCost.currency].amount -= singleCost.amount;
    });
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
        payForItem(state, item);
        item.buy();
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
