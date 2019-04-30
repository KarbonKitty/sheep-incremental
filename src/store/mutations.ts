import { MutationTree } from 'vuex';
import GameState from './state';
import { getPriceCurrencies } from '@/classes/helpers';
import { Price } from '@/classes/baseClasses';

export const stateMutations: MutationTree<GameState> = {
    construct(state) {
        state.currentSelection = state.buildings.filter(b => b.branch === 'housing')[0];
        state.currentBranch = 'housing';
        state.currentGoal = state.goals.tribal;
    },
    getPaid(state, price: Price) {
        getPriceCurrencies(price).filter(c => state.resources[c].locks.length === 0).forEach(currency => {
            state.resources[currency].amount += (price[currency] || 0);
        });
    },
    accumulatePerSecondValues(state, payload: { deltaT: number, valuePerDelta: Price, isPositive: boolean }) {
        getPriceCurrencies(payload.valuePerDelta).forEach(c => {
            state.resources[c].gainPerSecond[state.iteration] += (payload.valuePerDelta[c] || 0) * 1000 / payload.deltaT * (payload.isPositive ? 1 : -1);
        });
    },
    payThePrice(state, price: Price) {
        getPriceCurrencies(price).forEach(currency => {
            const currentPrice = (price[currency] || 0);
            state.resources[currency].amount -= currentPrice;
            state.resources[currency].amountSpent += currentPrice;
        })
    },
    proceedWithExpeditions(state, deltaT: number) {
        state.expeditions.filter(e => e.timeLeftToComplete > 0).forEach(e => e.passTime(deltaT));
    }
};
