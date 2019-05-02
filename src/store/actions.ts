// import { ActionTree } from 'vuex';
// import { GameState } from '@/';
// import * as consts from '@/consts';

// export const actions: ActionTree<GameState, GameState> = {
//     tick({ getters, state }, currentTick: number) {
//         const diff = currentTick - state.lastTick;
//         // update state approprietly
//         state.money += getters.energyProduction * (diff / 1000);
//         //
//         state.lastTick = currentTick;
//     },
//     tryBuyBuilding({ state }, buildingId: string) {
//         const building = state.buildings.find(b => b.id === buildingId);
//         if (typeof building === 'undefined') {
//             return;
//         } else {
//             const cost = building.basePrice * Math.pow(consts.basePriceMultiplier, building.numberBuilt);
//             if (state.money >= cost) {
//                 building.numberBuilt += 1;
//                 state.money -= cost;
//             }
//         }
//     },
// };
