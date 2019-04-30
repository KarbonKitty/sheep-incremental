import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

import EventBus from "./eventBus";

const tickInterval = 50;
const autosaveInterval = 15000;

Vue.config.productionTip = false;

store.dispatch('build').then(() => {
  const vm = new Vue({
    store,
    render: (h) => h(App),
  }).$mount('#app');

  EventBus.$on("show-toast", (data: string) => {
    const toastComponent = vm.$refs.toast as any;
    toastComponent.addMessage(data);
  });

  // start the game loop
  const gameLoopHandle = setInterval(() => store.dispatch('tick', Date.now()), tickInterval);

  // start autosave loop
  const autoSaveHandle = setInterval(async () => localStorage.setItem(store.state.saveGameName, await store.dispatch('save')), autosaveInterval);
});

