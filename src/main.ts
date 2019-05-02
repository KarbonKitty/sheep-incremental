import Vue from 'vue';
import App from './App.vue';
//import store from './store/store';

import EventBus from "./eventBus";

import GameEngine from "./gameEngine";
import engine from './engine';

const tickInterval = 50;
const autosaveInterval = 15000;

Vue.config.productionTip = false;

const vm = new Vue({
  //store,
  render: (h) => h(App),
}).$mount('#app');

EventBus.$on("game-event", (data: any) => {
  engine.handleEvent(data);
});

EventBus.$on("show-toast", (data: string) => {
  const toastComponent = vm.$refs.toast as any;
  toastComponent.addMessage(data);
});

//store.commit('init');

// start the game loop
const gameLoopHandle = setInterval(() => engine.tick(Date.now()), tickInterval);
//const gameLoopHandle = setInterval(() => store.dispatch('tick', Date.now()), tickInterval);

// start autosave loop
const autoSaveHandle = setInterval(() => localStorage.setItem(engine.saveGameName, engine.save()), autosaveInterval);
