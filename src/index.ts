import Vue from "vue";

import GameState from "./gameState";
import GameEngine from "./gameEngine";

import ResourceComponent from "./components/resource-component";

import filters from "./filters";

const interval = 50;

let gameState = new GameState();

let gameEngine = new GameEngine(gameState);

let vm = new Vue({
    el: "#app",
    data: gameState,
    methods: {
        gatherGrass: () => gameEngine.gatherGrass()
    },
    filters,
    components: {
        'resource-component': ResourceComponent
    }
});

let handle = window.setInterval(() => gameEngine.tick(Date.now()), interval);
