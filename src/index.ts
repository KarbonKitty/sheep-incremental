import GameState from "./gameState";
import Vue from "vue";

const interval = 50;

let gameState = new GameState();

let vm = new Vue({
    el: "#app",
    data: gameState,
    filters: {
        decimal: (value: number, numberOfDigits: number) =>
        {
            return value.toFixed(numberOfDigits);
        }
    }
});

let handle = window.setInterval(() => gameState.tick(Date.now()), interval);
