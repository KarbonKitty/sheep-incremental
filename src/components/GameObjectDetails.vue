<template lang="pug">
  div
    building-details-component(v-if="isBuilding" :building="gameObject" :upgrades="upgrades")
    idea-details-component(v-else-if="isIdea" :idea="gameObject")
    expedition-details-component(v-else-if="isExpedition" :expedition="gameObject")
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import GameObject from "../classes/gameObject/GameObject";
import typeGuards from "../classes/typeGuards";

import { Idea } from "../classes/Idea";

import BuildingDetailsComponent from "./BuildingDetails.vue";
import IdeaDetailsComponent from "./IdeaDetails.vue";
import ExpeditionDetailsComponent from "./ExpeditionDetails.vue";

export default baseComponent.extend({
  props: {
    gameObject: Object as () => GameObject,
    upgrades: Array as () => Idea[] | undefined
  },
  components: {
    'building-details-component': BuildingDetailsComponent,
    'idea-details-component': IdeaDetailsComponent,
    'expedition-details-component': ExpeditionDetailsComponent
  },
  computed: {
    isBuilding: function(): boolean {
      return typeGuards.isBuilding(this.gameObject);
    },
    isIdea: function(): boolean {
      return typeGuards.isIdea(this.gameObject);
    },
    isExpedition: function(): boolean {
      return typeGuards.isExpeditionPlan(this.gameObject);
    }
  }
});
</script>
