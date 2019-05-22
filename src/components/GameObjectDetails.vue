<template lang="pug">
  div
    building-details-component(v-if="isBuilding" :building="gameObject" :upgrades="upgrades")
    discovery-details-component(v-else-if="isDiscovery" :discovery="gameObject")
    expedition-details-component(v-else-if="isExpedition" :expedition="gameObject")
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import GameObject from "../classes/gameObject/GameObject";
import typeGuards from "../classes/typeGuards";

import { Idea } from "../classes/Idea";

import BuildingDetailsComponent from "./BuildingDetails.vue";
import DiscoveryDetailsComponent from "./DiscoveryDetails.vue";
import ExpeditionDetailsComponent from "./ExpeditionDetails.vue";

export default baseComponent.extend({
  props: {
    gameObject: Object as () => GameObject,
    upgrades: Array as () => Idea[] | undefined
  },
  components: {
    'building-details-component': BuildingDetailsComponent,
    'discovery-details-component': DiscoveryDetailsComponent,
    'expedition-details-component': ExpeditionDetailsComponent
  },
  computed: {
    isBuilding: function(): boolean {
      return typeGuards.isBuilding(this.gameObject);
    },
    isDiscovery: function(): boolean {
      return typeGuards.isIdea(this.gameObject) && typeof this.gameObject.template.unlocks !== 'undefined';
    },
    isExpedition: function(): boolean {
      return typeGuards.isExpeditionPlan(this.gameObject);
    }
  }
});
</script>
