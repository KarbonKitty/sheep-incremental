import GameState from "../gameState";
import GameEngine from "./gameEngine";
import IBuyable from "../classes/IBuyable";
import { CurrencyValue, Currency } from "../classes/baseClasses";

const engine = {
    tryBuyItem(state: GameState, itemId: string): IBuyable | undefined {
        const item = selectBuyableItem(state, itemId);

        if (!this.canBeBought(state, item)) {
            return undefined;
        }

        payForItem(state, item);

        item.quantity++;
        return item;
    },
    canBeBought(state: GameState, item: IBuyable): boolean {
        const realCost = this.getRealCost(item);
        return realCost.reduce((acc, cost) => acc && state.resources[cost.currency].amount >= cost.amount, true);
    },
    getRealCost(item: IBuyable): CurrencyValue[] {
        return item.rawCost.map(v => ({ currency: v.currency, amount: v.amount * Math.pow(1.15, item.quantity) }));
    }
}

export default engine;

function selectBuyableItem(state: GameState, itemId: string): IBuyable {
    let candidates = GameEngine.getAllGameObjects(state).filter(p => p.id === itemId);
    const item = candidates.pop();
    if (candidates.length > 0 || typeof item === 'undefined') {
        throw new Error("Duplicate item ID or no item with given id: " + itemId);
    }
    return item;
}

function payForItem(state: GameState, item: IBuyable): void {
    const realCost = engine.getRealCost(item);
    realCost.forEach(singleCost => {
        state.resources[singleCost.currency].amount -= singleCost.amount;
    });
}