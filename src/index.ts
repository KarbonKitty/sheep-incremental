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
    components: {
        'resource-component': ResourceComponent,
        'game-object-component': GameObjectComponent,
        'building-details-component': BuildingDetailsComponent
    }
});

let handle = window.setInterval(() => engine.tick(Date.now()), interval);
