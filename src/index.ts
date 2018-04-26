import Vue from "vue";

import GameState from "./gameState";
import GameEngine from "./engine/gameEngine";

import ResourceComponent from "./components/Resource.vue";
import ProducerComponent from "./components/Producer.vue";
import DiscoveryComponent from "./components/Discovery.vue";
import BuildingDetailsComponent from "./components/BuildingDetails.vue";

const interval = 50;

let gameState = new GameState();

let vm = new Vue({
    el: "#app",
    data: gameState,
    created() {
        this.$on('game-event', (data: any) => GameEngine.handleEvent(gameState, data))
    },
    components: {
        'resource-component': ResourceComponent,
        'producer-component': ProducerComponent,
        'building-details-component': BuildingDetailsComponent,
        'discovery-component': DiscoveryComponent
    }
});

let handle = window.setInterval(() => GameEngine.tick(gameState, Date.now()), interval);
