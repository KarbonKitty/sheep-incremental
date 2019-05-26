<template lang="pug">
  #app
    .container
      toast-component(ref="toast")
      prestige-modal-component(:visible="prestiging" :advancements="advancements.filter(a => a.locks.length === 1)" :points="resources.advancement.amount")

      .sidebar
        h2 Resources
        population-sidebar-component
        resource-sidebar-component
        sites-sidebar-component

      .buttons
        .tabs
          div(v-for="branch in branches" v-if="availableObjectsFromBranch(branch).length > 0")
            branch-button-component(:name="branch" :active="currentBranch === branch")
        .object-list
          div(v-for="o in availableObjectsFromBranch(currentBranch)")
            game-object-component(:game-object="o" :upgrades="availableUpgradesFor(o)" :active="o.id === currentSelection.id")

      .details
        object-details-component(:game-object="currentSelection" :upgrades="currentUpgrades")

      .log
        message-log-component
        goal-component(:values="currentGoal")
        h4 Controls
        button.btn(v-on:click="saveGame") Save
        button.btn(v-on:click="loadGame") Load
        button.btn(v-on:click="clearSave") Clear Save
</template>

<script lang="ts">
import Vue from 'vue';
import Building from './components/Building.vue';
import GameStatus from './components/GameStatus.vue';

import ObjectDetails from "./components/GameObjectDetails.vue";
import GameObjectComponent from "./components/GameObjectButton.vue";
import GoalComponent from "./components/Goal.vue";
import PrestigeModalComponent from "./components/PrestigeModal.vue";
import ToastComponent from "./components/Toast.vue";
import BranchButtonComponent from "./components/BranchButton.vue";
import ResourceSidebarComponent from "./components/ResourceSidebar.vue";
import SitesSidebarComponent from "./components/SitesSidebar.vue";
import PopulationSidebarComponent from "./components/PopulationSidebar.vue";
import MessageLogComponent from "./components/MessageLog.vue";

import { branchesArray as Branches, IndustryBranch } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";

import filters from "./filters";
import GameEngine from "./gameEngine";
import { engine, eventHandlers, state } from "./engine";

export default Vue.extend({
    name: 'app',
    data: () => state,
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
                engine.load(savedGame);
            }
        },
        clearSave: function() {
            localStorage.removeItem(engine.saveGameName);
        },
        availableObjectsFromBranch(branch: IndustryBranch) {
            return engine.getAllGameObjects().filter(o => o.locks.length === 0 && o.branch === branch);
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
        availableUpgrades: function() {
            return this.upgrades.filter(u => u.isAvailable());
        },
        allDiscoveries: function() {
            return this.ideas.filter(i => typeof i.template.unlocks !== 'undefined');
        }
    },
    components: {
        "resource-sidebar-component": ResourceSidebarComponent,
        "sites-sidebar-component": SitesSidebarComponent,
        "population-sidebar-component": PopulationSidebarComponent,
        "game-object-component": GameObjectComponent,
        "object-details-component": ObjectDetails,
        "goal-component": GoalComponent,
        "toast-component": ToastComponent,
        "prestige-modal-component": PrestigeModalComponent,
        "branch-button-component": BranchButtonComponent,
        "message-log-component": MessageLogComponent
    },
    filters
});
</script>

<style lang="stylus">
body
  background-color $base03
  font-family 'Assistant', sans-serif
  color $base0

a
  text-decoration none

a:link
  color $green

a:visited
  color $violet

a:hover
  text-decoration underline
  color $red

a:active
  text-decoration underline
  color $blue

.container
  display grid
  grid-template-columns 25% 50% 25%
  grid-template-rows 50% 50%

.sidebar
  grid-column 1
  grid-row 1 / 2

.buttons
  grid-column 2
  grid-row 1
  margin 0 1rem

.details
  grid-column 2
  grid-row 2
  margin 0 1rem

.log
  grid-column 3
  grid-row 1 / 2

.top-column
  display flex
  flex-direction column

.btn
  border 0
  border-radius 4px
  font-size 16px
  padding 6px 12px 6px 12px
  text-decoration none
  cursor pointer
  color $base2
  background $blue

.btn:hover
  background-color $base02

.btn.save
  color $base2
  background $blue

.btn.danger
  color $base2
  background $red

.btn:disabled
  background $base03
  color $base0
  border 1px solid $base0
  cursor default

.tabs
  display flex
  flex-direction row
  border-bottom 2px solid $base0
  margin-bottom 0.5rem

.tab
  text-align center
  padding 0 0.5rem
  margin 0.125rem 0.125rem -1px 0.125rem
  cursor pointer
  border 1px solid $base0
  border-radius 2px

.tab.available
  font-weight bold
  background $base02

.selectButton
  text-align center
  padding 0 0.25rem
  margin 0.125rem
  border 1px solid $base0
  border-radius 4px
  width 200px
  cursor pointer

.selectButton > p
  margin 0.5rem 0

.selectButton.available
  font-weight bold
  background $base02

h2
  margin-top 0
</style>
