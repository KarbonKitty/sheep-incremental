import Vue from "vue";

import GameState from "./gameState";
import GameEngine from "./engine/gameEngine";
import LockEngine from "./engine/lockEngine";

import ResourceComponent from "./components/Resource.vue";
import ProducerComponent from "./components/Producer.vue";
import BuildingDetailsComponent from "./components/BuildingDetails.vue";

import filters from "./filters";

const interval = 50;

let gameState = new GameState();

let vm = new Vue({
    el: "#app",
    data: gameState,
    created() {
        this.$on('game-event', (data: any) => GameEngine.handleEvent(gameState, data))
    },
    methods: {
        uf() {
            LockEngine.removeLock(gameState, 'flour');
        }
    },
    filters,
    components: {
        'resource-component': ResourceComponent,
        'producer-component': ProducerComponent,
        'building-details-component': BuildingDetailsComponent
    }
});

let handle = window.setInterval(() => GameEngine.tick(gameState, Date.now()), interval);
