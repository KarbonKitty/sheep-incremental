import GameState from "../gameState"
import ProducerEngine from "./producerEngine";
import BuyableEngine from "./buyableEngine";
import { GameEvent, CurrencyValue } from "../classes/baseClasses";
import IGameObject from "../classes/IGameObject";
import DiscoveryEngine from "./discoveryEngine";

export default {
    tick(state: GameState, currentTick: number) {
        let deltaT = currentTick - state.lastTick;
        state.lastTick = currentTick;

        clearPerSecondValues(state);
        ProducerEngine.activateProducers(state, deltaT);
        discardResourcesOverLimit(state);
    },

    handleEvent(state: GameState, data: { type: GameEvent, value: any }) {
        switch (data.type) {
            case 'buy':
                BuyableEngine.tryBuyItem(state, data.value);
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
    },

    getAllGameObjects(state: GameState): IGameObject[] {
        let gameObjects = <IGameObject[]>[];
        gameObjects = gameObjects.concat(state.producers);
        gameObjects = gameObjects.concat(state.discoveries);
        return gameObjects;
    },

    getGameObjectById(state: GameState, id: string): IGameObject | undefined {
        const gameObjects = this.getAllGameObjects(state);
        const item = gameObjects.filter(go => go.id === id).pop();
        return item;
    }
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
    const item = state.producers.filter(p => p.id === itemId).pop();
    if (typeof item === 'undefined') {
        return false;
    }
    state.currentSelection = item;
    return true;
}
