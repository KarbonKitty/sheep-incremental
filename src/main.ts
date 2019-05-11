import Vue from 'vue';
import App from './App.vue';

import engine from './engine';
import { tickInterval, autosaveInterval } from './consts';
import { GameEventHandlers } from './gameEngineInterfaces';

Vue.config.productionTip = false;
Vue.prototype.$engineEvents = engine as GameEventHandlers;
Vue.prototype.$resources = engine.resources;
Vue.prototype.$population = engine.population;

const vm = new Vue({
  render: (h) => h(App),
}).$mount('#app');

// start the game loop
const gameLoopHandle = setInterval(() => engine.tick(Date.now()), tickInterval);

// start autosave loop
const autoSaveHandle = setInterval(() => localStorage.setItem(engine.saveGameName, engine.save()), autosaveInterval);

export { vm };
