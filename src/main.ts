import Vue from 'vue';
import App from './App.vue';

import EventBus from "./eventBus";

import engine from './engine';

const tickInterval = 50;
const autosaveInterval = 15000;

Vue.config.productionTip = false;

const vm = new Vue({
  render: (h) => h(App),
}).$mount('#app');

EventBus.$on("game-event", (data: any) => {
  engine.handleEvent(data);
});

// start the game loop
const gameLoopHandle = setInterval(() => engine.tick(Date.now()), tickInterval);

// start autosave loop
const autoSaveHandle = setInterval(() => localStorage.setItem(engine.saveGameName, engine.save()), autosaveInterval);
