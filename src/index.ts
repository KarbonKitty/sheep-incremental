import GameState from "./gameState";
import Vue from "vue";
import GameEngine from "./gameEngine";

const interval = 50;

let gameState = new GameState();

let gameEngine = new GameEngine(gameState);

let vm = new Vue({
    el: "#app",
    data: gameState,
    methods: {
        gatherGrass: gameEngine.gatherGrass
    },
    filters: {
        decimal: (value: number, numberOfDigits: number) =>
        {
            return value.toFixed(numberOfDigits);
        }
    }
});

let handle = window.setInterval(() => gameEngine.tick(Date.now()), interval);
