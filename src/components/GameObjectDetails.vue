<template lang="pug">
  div
    building-details-component(v-if="isBuilding" :building="gameObject" :resources="$resources" :upgrades="upgrades" :population="$population")
    discovery-details-component(v-else-if="isDiscovery" :discovery="gameObject" :resources="$resources")
    expedition-details-component(v-else-if="isExpedition" :expedition="gameObject" :resources="$resources")
</template>

<script lang="ts">
import Vue from 'vue';

import GameObject from "../classes/gameObject/GameObject";
import typeGuards from "../classes/typeGuards";

import { Idea } from "../classes/Idea";

import BuildingDetailsComponent from "./BuildingDetails.vue";
import DiscoveryDetailsComponent from "./DiscoveryDetails.vue";
import ExpeditionDetailsComponent from "./ExpeditionDetails.vue";

export default Vue.extend({
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
      return typeGuards.isExpedition(this.gameObject);
    }
  }
});
</script>
