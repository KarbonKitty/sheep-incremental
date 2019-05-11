<template lang="pug">
  #app
    .container
      toast-component(ref="toast")
      prestige-modal-component(:visible="prestiging" :advancements="advancements.filter(a => a.locks.length === 1)" :points="$resources.advancement.amount")

      .sidebar
        h2 Resources
        div Workers (employed / all): {{ $population.workers }} / {{ $population.housing }}
        resource-sidebar-component
        button.btn(v-on:click="saveGame") Save
        button.btn(v-on:click="loadGame") Load
        button.btn(v-on:click="clearSave") Clear Save
        goal-component(:values="currentGoal")

      .branch-list
        h2 Branches
        div(v-for="branch in branches")
          div(v-if="availableBuildingsFromBranch(branch).length > 0")
            branch-button-component(:name="branch" :active="currentBranch === branch")
        div(v-if="allDiscoveries.filter(d => d.locks.length === 0 && !d.done).length > 0")
          branch-button-component(name="discoveries" :active="currentBranch === 'discoveries'")
          // Here be dragons
        div
          branch-button-component(name="expeditions" :active="currentBranch === 'expeditions'")

      .object-list
        h2 Objects
        div(v-if="this.currentBranch === 'discoveries'")
          div(v-for="discovery in allDiscoveries.filter(d => d.locks.length === 0 && !d.done)")
            game-object-component(:game-object="discovery" :upgrades="availableUpgradesFor(discovery)" :active="discovery.id === currentSelection.id")
        div(v-if="this.currentBranch === 'expeditions'")
          div(v-for="e in expeditions.filter(e => e.isAvailable())")
            game-object-component(:game-object="e" :upgrades="[]" :active="e.id === currentSelection.id")
        div(v-else)
          div(v-for="b in availableBuildingsFromBranch(this.currentBranch)")
            game-object-component(:game-object="b" :upgrades="availableUpgradesFor(b)" :active="b.id === currentSelection.id")

      .details
        object-details-component(:game-object="currentSelection" :upgrades="currentUpgrades")
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

import { branchesArray as Branches, IndustryBranch } from "./classes/baseClasses";
import GameObject from "./classes/gameObject/GameObject";

import filters from "./filters";
import GameEngine from "./gameEngine";
import engine from "./engine";

export default Vue.extend({
    name: 'app',
    data: () => engine,
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
        "game-object-component": GameObjectComponent,
        "object-details-component": ObjectDetails,
        "goal-component": GoalComponent,
        "toast-component": ToastComponent,
        "prestige-modal-component": PrestigeModalComponent,
        "branch-button-component": BranchButtonComponent
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
  grid-template-columns 400px 250px 250px auto
  grid-template-rows 100%

.sidebar
  grid-column 1
  grid-row 1
  margin-right 0.5rem

.branch-list
  grid-column 2
  grid-row 1
  justify-self center

.object-list
  grid-column 3
  grid-row 1
  justify-self center

.details
  grid-column 4
  grid-row 1

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
