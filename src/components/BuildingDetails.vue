<template>
  <div>
    <h3>{{ building.name }}</h3>
    <p>{{ building.desc }}</p>
    <price-component :values="building.currentPrice" :resources="resources">Price:</price-component>
    <currency-value-component v-if="typeof building.rawConsumption !== 'undefined'" :values="building.currentConsumption" :resources="resources">Inputs:</currency-value-component>
    <currency-value-component v-if="typeof building.rawProduction !== 'undefined'" :values="building.currentProduction" :resources="resources">Outputs:</currency-value-component>
    <currency-value-component v-if="typeof building.storage !== 'undefined'" :values="building.storage" :resources="resources">Storage:</currency-value-component>
    <button class="btn buyButton" @click="emitBuyEvent" :disabled="!canBePaid">{{ building.buyVerb }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import IBuyable from "../classes/IBuyable";
import GameObject from '../classes/gameObject/GameObject';
import { IResource,  IResourcesData } from '../classes/baseClasses';
import filters from "../filters";

import CurrencyValueComponent from "./CurrencyValue.vue";
import PriceComponent from "./Price.vue";

export default Vue.extend({
  props: {
    building: Object as () => GameObject & IBuyable,
    resources: Object as () => IResourcesData
  },
  components: {
    'currency-value-component': CurrencyValueComponent,
    'price-component': PriceComponent
  },
  methods: {
    emitBuyEvent: function() {
      this.$parent.$emit('game-event', { type: 'buy', value: this.building.id });
    }
  },
  computed: {
    canBePaid: function(): boolean {
      return Object.keys(this.building.currentPrice).reduce((acc, cv) => acc && this.resources[cv].amount >= (this.building.currentPrice[cv] || 0), true);
    }
  }
})
</script>

<style scoped>
  button:disabled {
    background-color: #073642;
    color: #657b83;
  }
</style>
