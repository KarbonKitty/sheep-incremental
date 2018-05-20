import Vue from "vue";
import EventBus from "./eventBus";

import filters from "./filters";
import GameEngine from "./gameEngine";

import ResourceComponent from "./components/Resource.vue";
import GameObjectComponent from "./components/GameObject.vue";
import BuildingDetailsComponent from "./components/BuildingDetails.vue";
import GoalComponent from "./components/Goal.vue";
import ToastComponent from "./components/Toast.vue";
import PrestigeModalComponent from "./components/PrestigeModal.vue";

import { branchesArray as Branches, IndustryBranch } from "./classes/baseClasses";

const interval = 50;

let engine = new GameEngine();

EventBus.$on('game-event', (data: any) => {
    engine.handleEvent(data);
});

let vm = new Vue({
    el: "#app",
    data: engine,
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
        },
        availableBuildingsFromBranch(branch: IndustryBranch) {
            return this.buildings.filter(b => b.locks.length === 0 && b.branch === branch);
        }
    },
    computed: {
        currentUpgrades: function() {
            return this.upgrades.filter(u => !u.done && u.objectId === this.currentSelection.id && u.locks.length === 0);
        },
        branches: function () {
            return Branches;
        },
        upgrades: function() {
            return this.concepts.filter(c => c.type === 'upgrade');
        },
        discoveries: function() {
            return this.concepts.filter(c => c.type === 'discovery');
        }
    },
    components: {
        'resource-component': ResourceComponent,
        'game-object-component': GameObjectComponent,
        'building-details-component': BuildingDetailsComponent,
        'goal-component': GoalComponent,
        'toast-component': ToastComponent,
        'prestige-modal-component': PrestigeModalComponent
    },
    filters: filters
});

let handle = window.setInterval(() => engine.tick(Date.now()), interval);
