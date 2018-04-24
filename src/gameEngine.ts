import GameState from "./gameState"
import { GameEvent, CurrencyValue } from "./classes/baseClasses";

export default class GameEngine {
    tick(state: GameState, currentTick: number) {
        let deltaT = currentTick - state.lastTick;
        state.lastTick = currentTick;

        this.clearPerSecondValues(state);
        this.produceElements(state, deltaT);
    }

    handleEvent(state: GameState, data: { type: GameEvent, value: any }) {
        switch (data.type) {
            case 'buy':
                this.buyItem(state, data.value);
            case 'change-selection':
                this.changeSelection(state, data.value);
        }
    }

    private produceElements(state: GameState, deltaT: number) {
        state.producers.forEach(producer => {
            let haveResourcesToConsume = producer.consumption.reduce((acc, consumption) => acc && state.resources[consumption.currency].amount >= consumption.amount * producer.quantity, true);
            if (haveResourcesToConsume)
            {
                producer.consumption.forEach(resourceToConsume => this.consumeCurrency(state, resourceToConsume, producer.quantity, deltaT));
                producer.production.forEach(productionValue => this.produceCurrency(state, productionValue, producer.quantity, deltaT));
            }
        });
    }

    // TODO: think about the production/consumption ideas

    private produceCurrency(state: GameState, productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
        const currentResource = state.resources[productionValue.currency];
        currentResource.amount += productionValue.amount * producerQuantity * deltaT / 1000;
        if (currentResource.limit != null && currentResource.amount > currentResource.limit) {
            currentResource.amount = currentResource.limit;
        }
        currentResource.gainPerSecond += productionValue.amount * producerQuantity;
    }

    private consumeCurrency(state: GameState, productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
        const currentResource = state.resources[productionValue.currency];
        currentResource.amount -= productionValue.amount * producerQuantity * deltaT / 1000;
        currentResource.gainPerSecond -= productionValue.amount * producerQuantity;
    }

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

    private buyItem(state: GameState, itemId: string): boolean {
        const item = state.producers.filter(p => p.id === itemId).pop();
        if (typeof item === 'undefined') {
            return false;
        }

        let canBeBought = true;
        item.cost.forEach(singleCost => {
            canBeBought = canBeBought && state.resources[singleCost.currency].amount >= singleCost.amount;
        });


        if (!canBeBought) {
            return false;
        }

        item.cost.forEach(singleCost => {
            state.resources[singleCost.currency].amount -= singleCost.amount;
        });

        item.quantity++;
        return true;
    }
}
