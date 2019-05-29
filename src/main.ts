import Vue from 'vue';
import App from './App.vue';

import { engine } from './engine';
import { tickInterval, autosaveInterval } from './consts';
import { GameEventHandlers } from './gameEngineInterfaces';

Vue.config.productionTip = false;
Vue.prototype.$engineEvents = engine as GameEventHandlers;

const vm = new Vue({
  render: (h) => h(App),
}).$mount('#app');

// start the game loop
const gameLoopHandle = setInterval(() => {
  let loop = true;
  while (loop) {
    loop = engine.tick(Date.now());
  }
}, tickInterval);

// start autosave loop
const autoSaveHandle = setInterval(() => localStorage.setItem(engine.saveGameName, engine.save()), autosaveInterval);

export { vm };
