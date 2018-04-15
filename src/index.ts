import GameState from "./mainClasses";
import Vue from "vue";

const interval = 50;

let gameState = new GameState();

let vm = new Vue({
    el: "#app",
    data: gameState
});

let handle = window.setInterval(() => gameState.tick(Date.now()), interval);
