import GameState from "./gameState"
import { GameEvent, CurrencyValue } from "./classes/baseClasses";

export default class GameEngine {
    state: GameState;

    constructor(gameState: GameState) {
        this.state = gameState;
    }

    tick(currentTick: number) {
        let deltaT = currentTick - this.state.lastTick;
        this.state.lastTick = currentTick;

        this.clearPerSecondValues();
        this.produceElements(deltaT);
    }

    handleEvent(data: { type: GameEvent, value: any }) {
        switch (data.type) {
            case 'buy':
                this.buyItem(data.value);
        }
    }

    private produceElements(deltaT: number) {
        this.state.producers.forEach(producer => {
            let haveResourcesToConsume = producer.consumption.reduce((acc, consumption) => acc && this.state.resources[consumption.currency].amount >= consumption.amount * producer.quantity, true);
            if (haveResourcesToConsume)
            {
                producer.consumption.forEach(resourceToConsume => this.consumeCurrency(resourceToConsume, producer.quantity, deltaT));
                producer.production.forEach(productionValue => this.produceCurrency(productionValue, producer.quantity, deltaT));
            }
        });
    }

    // TODO: think about the production/consumption ideas

    private produceCurrency(productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
        const currentResource = this.state.resources[productionValue.currency];
        currentResource.amount += productionValue.amount * producerQuantity * deltaT / 1000;
        if (currentResource.limit != null && currentResource.amount > currentResource.limit) {
            currentResource.amount = currentResource.limit;
        }
        currentResource.gainPerSecond += productionValue.amount * producerQuantity;
    }

    private consumeCurrency(productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
        const currentResource = this.state.resources[productionValue.currency];
        currentResource.amount -= productionValue.amount * producerQuantity * deltaT / 1000;
        currentResource.gainPerSecond -= productionValue.amount * producerQuantity;
    }

    private clearPerSecondValues() {
        Object.keys(this.state.resources).forEach(k => this.state.resources[k].gainPerSecond = 0);
    }

    private buyItem(itemId: string): boolean {
        const item = this.state.producers.filter(p => p.id === itemId).pop();
        if (typeof item === 'undefined') {
            return false;
        }

        let canBeBought = true;
        item.cost.forEach(singleCost => {
            canBeBought = canBeBought && this.state.resources[singleCost.currency].amount >= singleCost.amount;
        });


        if (!canBeBought) {
            return false;
        }

        item.cost.forEach(singleCost => {
            this.state.resources[singleCost.currency].amount -= singleCost.amount;
        });

        item.quantity++;
        return true;
    }
}
