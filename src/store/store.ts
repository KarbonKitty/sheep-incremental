import Vue from 'vue';
import Vuex from 'vuex';

import { stateMutations } from './mutations';
import { stateActions } from './actions';
import { stateGetters } from './getters';
import GameState from './state';

Vue.use(Vuex);

export default new Vuex.Store<GameState>({
  state: new GameState(),
  mutations: stateMutations,
  actions: stateActions,
  getters: stateGetters,
});
