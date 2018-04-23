import Vue from "vue";

import GameState from "./gameState";
import GameEngine from "./gameEngine";

import ResourceComponent from "./components/Resource.vue";
import ProducerComponent from "./components/Producer.vue";
import BuildingDetailsComponent from "./components/BuildingDetails.vue";

import filters from "./filters";

const interval = 50;

let gameState = new GameState();

let gameEngine = new GameEngine(gameState);

let vm = new Vue({
    el: "#app",
    data: gameState,
    created() {
        this.$on('game-event', (data: any) => gameEngine.handleEvent(data))
    },
    filters,
    components: {
        'resource-component': ResourceComponent,
        'producer-component': ProducerComponent,
        'building-details-component': BuildingDetailsComponent
    }
});

let handle = window.setInterval(() => gameEngine.tick(Date.now()), interval);
