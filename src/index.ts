import Vue from "vue";
import EventBus from "./eventBus";

import filters from "./filters";
import GameEngine from "./gameEngine";

import BuildingDetailsComponent from "./components/BuildingDetails.vue";
import GameObjectComponent from "./components/GameObject.vue";
import GoalComponent from "./components/Goal.vue";
import PrestigeModalComponent from "./components/PrestigeModal.vue";
import ResourceComponent from "./components/Resource.vue";
import ToastComponent from "./components/Toast.vue";

import { branchesArray as Branches, IndustryBranch } from "./classes/baseClasses";

const tickInterval = 50;
const autosaveInterval = 15000;

const engine = new GameEngine();

EventBus.$on("game-event", (data: any) => {
    engine.handleEvent(data);
});

const vm = new Vue({
    el: "#app",
    data: engine,
    methods: {
        saveGame: function(event: any) {
            console.log("Game saved");
            localStorage.setItem("industrial-incremental-save", engine.save());
        },
        loadGame() {
            const savedGame = localStorage.getItem("industrial-incremental-save");
            if (savedGame === null) {
                alert("There is no game to load!");
            } else {
                console.log("Game loaded");
                this.$data.load(savedGame);
            }
        },
        clearSave: function() {
            localStorage.removeItem("industrial-incremental-save");
        },
        availableBuildingsFromBranch(branch: IndustryBranch) {
            return this.buildings.filter(b => b.locks.length === 0 && b.branch === branch);
        }
    },
    computed: {
        currentUpgrades: function() {
            return this.upgrades.filter(
                u => !u.done && u.objectId === this.currentSelection.id && u.locks.length === 0
            );
        },
        branches: function() {
            return Branches;
        },
        upgrades: function() {
            return this.concepts.filter(c => c.type === "upgrade");
        },
        discoveries: function() {
            return this.concepts.filter(c => c.type === "discovery");
        }
    },
    components: {
        "resource-component": ResourceComponent,
        "game-object-component": GameObjectComponent,
        "building-details-component": BuildingDetailsComponent,
        "goal-component": GoalComponent,
        "toast-component": ToastComponent,
        "prestige-modal-component": PrestigeModalComponent
    },
    filters
});

const handle = window.setInterval(() => engine.tick(Date.now()), tickInterval);

const autoSaveHandle = window.setInterval(
    () => localStorage.setItem("industrial-incremental-save", engine.save()),
    autosaveInterval
);
