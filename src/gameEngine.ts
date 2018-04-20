import GameState from "./gameState"
import { GameEvent } from "./classes/baseClasses";

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

    handleEvent(data: { type: GameEvent, value: any })
    {
        switch (data.type)
        {
            case 'buy':
                this.buyItem(data.value);
        }
    }

    private produceElements(deltaT: number) {
        this.state.producers.forEach(producer => {
            const currentResource = this.state.resources[producer.production.currency];
            currentResource.amount += producer.production.amountPerSecond * producer.quantity * deltaT / 1000;
            if (currentResource.limit != null && currentResource.amount > currentResource.limit)
            {
                currentResource.amount = currentResource.limit;
            }
            currentResource.gainPerSecond += producer.production.amountPerSecond * producer.quantity;
        });
    }

    private clearPerSecondValues() {
        Object.keys(this.state.resources).forEach(k => this.state.resources[k].gainPerSecond = 0);
    }

    private buyItem(itemId: string) : boolean
    {
        const item = this.state.producers.filter(p => p.id === itemId).pop();
        if (typeof item === 'undefined') {
            return false;
        }
        
        let canBeBought = true;
        if (Array.isArray(item.cost)) {
            item.cost.forEach(singleCost => {
                canBeBought = canBeBought && this.state.resources[singleCost.currency].amount >= singleCost.amount;
            });
        } else {
            canBeBought = canBeBought && this.state.resources[item.cost.currency].amount >= item.cost.amount;
        }

        if (!canBeBought) {
            return false;
        }

        if (Array.isArray(item.cost)) {
            item.cost.forEach(singleCost => {
                this.state.resources[singleCost.currency].amount -= singleCost.amount;
            });
        } else {
            this.state.resources[item.cost.currency].amount -= item.cost.amount;
        }

        item.quantity++;
        return true;
    }
}
