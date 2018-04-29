import GameState from "../gameState"
import Producer from "../classes/producer/Producer";
import { CurrencyValue } from "../classes/baseClasses";

export default {
    activateProducers(state: GameState, deltaT: number) {
        state.producers.forEach(producer => {
            let haveResourcesToConsume = producer.consumption.reduce((acc, consumption) => acc && state.resources[consumption.currency].amount >= consumption.amount * producer.quantity, true);
            if (haveResourcesToConsume) {
                activateProducer(state, producer, deltaT);
            }
        });
    }
}
function activateProducer(state: GameState, producer: Producer, deltaT: number) {
    producer.consumption.forEach(resourceToConsume => consumeInputs(state, resourceToConsume, producer.quantity, deltaT));
    producer.production.forEach(productionValue => createOutputs(state, productionValue, producer.quantity, deltaT));
}
function createOutputs(state: GameState, productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
    const currentResource = state.resources[productionValue.currency];
    currentResource.amount += productionValue.amount * producerQuantity * deltaT / 1000;
    currentResource.gainPerSecond += productionValue.amount * producerQuantity;
}
function consumeInputs(state: GameState, productionValue: CurrencyValue, producerQuantity: number, deltaT: number) {
    const currentResource = state.resources[productionValue.currency];
    currentResource.amount -= productionValue.amount * producerQuantity * deltaT / 1000;
    currentResource.gainPerSecond -= productionValue.amount * producerQuantity;
}