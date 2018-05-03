import Vue from "vue";

import GameEngine from "./gameEngine";

import ResourceComponent from "./components/Resource.vue";
import GameObjectComponent from "./components/GameObject.vue";
import BuildingDetailsComponent from "./components/BuildingDetails.vue";

const interval = 50;

let engine = new GameEngine();

let vm = new Vue({
    el: "#app",
    data: engine,
    created() {
        this.$on('game-event', (data: any) => engine.handleEvent(data))
    },
    methods: {
        saveGame: function(event: any) {
            console.log("Game saved");
            localStorage.setItem('industrial-incremental-save', engine.save());
        },
        loadGame() {
            let savedGame = localStorage.getItem('industrial-incremental-save');
            if (savedGame === null) {
                alert("There is no game to load!")
            } else {
                console.log("Game loaded");
                this.$data.load(savedGame);
            }
        }
    },
    components: {
        'resource-component': ResourceComponent,
        'game-object-component': GameObjectComponent,
        'building-details-component': BuildingDetailsComponent
    }
});

let handle = window.setInterval(() => engine.tick(Date.now()), interval);
