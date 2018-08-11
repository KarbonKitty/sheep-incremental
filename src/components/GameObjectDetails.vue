<template lang="pug">
  div
    building-details-component(v-if="isBuilding" :building="gameObject" :resources="resources" :upgrades="upgrades" :population="population")
    discovery-details-component(v-else-if="isDiscovery" :discovery="gameObject" :resources="resources")
    expedition-details-component(v-else-if="isExpedition" :expedition="gameObject" :resources="resources")
</template>

<script lang="ts">
import Vue from 'vue';
import EventBus from "../eventBus";

import GameObject from "../classes/gameObject/GameObject";
import typeGuards from "../classes/typeGuards";

import { Idea } from "../classes/Idea";

import BuildingDetailsComponent from "./BuildingDetails.vue";
import DiscoveryDetailsComponent from "./DiscoveryDetails.vue";
import ExpeditionDetailsComponent from "./ExpeditionDetails.vue";
import { IResourcesData, IPopulation } from '../classes/baseClasses';

export default Vue.extend({
  props: {
    gameObject: Object as () => GameObject,
    resources: Object as () => IResourcesData,
    upgrades: Array as () => Idea[] | undefined,
    population: Object as () => IPopulation | undefined
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
