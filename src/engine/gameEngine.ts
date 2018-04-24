import GameState from "../gameState"
import ProducerEngine from "./producerEngine";
import BuyableEngine from "./buyableEngine";
import { GameEvent, CurrencyValue } from "../classes/baseClasses";

export default class GameEngine {
    tick(state: GameState, currentTick: number) {
        let deltaT = currentTick - state.lastTick;
        state.lastTick = currentTick;

        this.clearPerSecondValues(state);
        this.workProducers(state, deltaT);
    }

    handleEvent(state: GameState, data: { type: GameEvent, value: any }) {
        switch (data.type) {
            case 'buy':
                BuyableEngine.tryBuyItem(state, data.value);
            case 'change-selection':
                this.changeSelection(state, data.value);
        }
    }

    private workProducers(state: GameState, deltaT: number) {
        state.producers.forEach(producer => {
            let haveResourcesToConsume = producer.consumption.reduce((acc, consumption) => acc && state.resources[consumption.currency].amount >= consumption.amount * producer.quantity, true);
            if (haveResourcesToConsume)
            {
                ProducerEngine.activateProducer(state, producer, deltaT);
            }
        });
    }

    // TODO: think about the production/consumption ideas

    private clearPerSecondValues(state: GameState): void {
        Object.keys(state.resources).forEach(k => state.resources[k].gainPerSecond = 0);
    }

    private changeSelection(state: GameState, itemId: string): boolean {
        const item = state.producers.filter(p => p.id === itemId).pop();
        if (typeof item === 'undefined') {
            return false;
        }
        state.currentSelection = item;
        return true;
    }
}
