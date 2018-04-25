import GameState from "../gameState"
import ProducerEngine from "./producerEngine";
import BuyableEngine from "./buyableEngine";
import { GameEvent, CurrencyValue } from "../classes/baseClasses";
import IGameObject from '../classes/IGameObject';

export default {
    tick(state: GameState, currentTick: number) {
        let deltaT = currentTick - state.lastTick;
        state.lastTick = currentTick;

        clearPerSecondValues(state);
        workProducers(state, deltaT);
    },

    handleEvent(state: GameState, data: { type: GameEvent, value: any }) {
        switch (data.type) {
            case 'buy':
                BuyableEngine.tryBuyItem(state, data.value);
            case 'change-selection':
                changeSelection(state, data.value);
        }
    },

    getAllGameObjects(state: GameState): IGameObject[] {
        return state.producers;
    }
}

function workProducers(state: GameState, deltaT: number) {
    state.producers.forEach(producer => {
        let haveResourcesToConsume = producer.consumption.reduce((acc, consumption) => acc && state.resources[consumption.currency].amount >= consumption.amount * producer.quantity, true);
        if (haveResourcesToConsume) {
            ProducerEngine.activateProducer(state, producer, deltaT);
        }
    });
}

// TODO: think about the production/consumption ideas

function clearPerSecondValues(state: GameState): void {
    Object.keys(state.resources).forEach(k => state.resources[k].gainPerSecond = 0);
}

function changeSelection(state: GameState, itemId: string): boolean {
    const item = state.producers.filter(p => p.id === itemId).pop();
    if (typeof item === 'undefined') {
        return false;
    }
    state.currentSelection = item;
    return true;
}
