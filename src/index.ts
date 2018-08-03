import Vue from "vue";
import EventBus from "./eventBus";

import filters from "./filters";
import GameEngine from "./gameEngine";

import ObjectDetails from "./components/GameObjectDetails.vue";
import GameObjectComponent from "./components/GameObjectButton.vue";
import GoalComponent from "./components/Goal.vue";
import PrestigeModalComponent from "./components/PrestigeModal.vue";
import ResourceComponent from "./components/Resource.vue";
import ToastComponent from "./components/Toast.vue";
import BranchButtonComponent from "./components/BranchButton.vue";

import { branchesArray as Branches, IndustryBranch } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";

const tickInterval = 50;
const autosaveInterval = 15000;

const engine = new GameEngine();

EventBus.$on("game-event", (data: any) => {
    engine.handleEvent(data);
});

EventBus.$on("show-toast", (data: string) => {
    const toastComponent = vm.$refs.toast as any;
    toastComponent.addMessage(data);
});

const vm = new Vue({
    el: "#app",
    data: engine,
    methods: {
        saveGame: function() {
            console.log("Game saved");
            localStorage.setItem(engine.saveGameName, engine.save());
        },
        loadGame() {
            const savedGame = localStorage.getItem(engine.saveGameName);
            if (savedGame === null) {
                alert("There is no game to load!");
            } else {
                console.log("Game loaded");
                this.$data.load(savedGame);
            }
        },
        clearSave: function() {
            localStorage.removeItem(engine.saveGameName);
        },
        availableBuildingsFromBranch(branch: IndustryBranch) {
            return this.buildings.filter(b => b.locks.length === 0 && b.branch === branch);
        },
        availableUpgradesFor(gameObject: GameObject) {
            return this.ideas.filter(i => i.template.objectId === gameObject.id && !i.done);
        }
    },
    computed: {
        currentUpgrades: function() {
            return this.ideas.filter(
                i => !i.done && i.template.objectId === this.currentSelection.id && i.locks.length === 0
            );
        },
        branches: function() {
            return Branches;
        },
        upgrades: function() {
            return this.ideas.filter(i => typeof i.template.effects !== 'undefined');
        },
        availableUpgrades: function() {
            return this.upgrades.filter(u => u.isAvailable());
        },
        discoveries: function() {
            return this.ideas.filter(i => typeof i.template.unlocks !== 'undefined');
        }
    },
    components: {
        "resource-component": ResourceComponent,
        "game-object-component": GameObjectComponent,
        "object-details-component": ObjectDetails,
        "goal-component": GoalComponent,
        "toast-component": ToastComponent,
        "prestige-modal-component": PrestigeModalComponent,
        "branch-button-component": BranchButtonComponent
    },
    filters
});

const handle = window.setInterval(() => engine.tick(Date.now()), tickInterval);

const autoSaveHandle = window.setInterval(
    () => localStorage.setItem(engine.saveGameName, engine.save()),
    autosaveInterval
);
