import GameState from "../gameState"
import IProducer from "../classes/IProducer";
import { CurrencyValue } from "../classes/baseClasses";

export default {
    activateProducer(state: GameState, producer: IProducer, deltaT: number) {
        producer.consumption.forEach(resourceToConsume => this.consumeInputs(state, resourceToConsume, producer.quantity, deltaT));
        producer.production.forEach(productionValue => this.createOutputs(state, productionValue, producer.quantity, deltaT));
    },
    createOutputs(state: GameState, productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
        const currentResource = state.resources[productionValue.currency];
        currentResource.amount += productionValue.amount * producerQuantity * deltaT / 1000;
        if (currentResource.limit != null && currentResource.amount > currentResource.limit) {
            currentResource.amount = currentResource.limit;
        }
        currentResource.gainPerSecond += productionValue.amount * producerQuantity;
    },
    consumeInputs(state: GameState, productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
        const currentResource = state.resources[productionValue.currency];
        currentResource.amount -= productionValue.amount * producerQuantity * deltaT / 1000;
        currentResource.gainPerSecond -= productionValue.amount * producerQuantity;
    }
}