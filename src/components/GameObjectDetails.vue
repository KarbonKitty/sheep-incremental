<template lang="pug">
  .miniGrid
    .gridHeader
      h2 Object details
    .mainData
      h3 {{ gameObject.name }}
      p {{ gameObject.desc }}
      price-component(:values="gameObject.currentPrice" :resources="resources") Price:
      population-component(:employees="gameObject.template.employees" :housing="gameObject.template.housing" :population="population")
      currency-value-component(v-if="hasConsumption" :values="gameObject.consumption.getTotal()" :resources="resources") Inputs:
      currency-value-component(v-if="hasProduction" :values="gameObject.production.getTotal()" :resources="resources") Outputs:
      currency-value-component(v-if="hasStorage" :values="gameObject.storage" :resources="resources") Storage:
      button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ gameObject.buyVerb }}
      button.btn.disableButton(v-if="canBeDisabled" @click="emitDisableEvent" :disabled="gameObject.quantity === 0") {{ gameObject.disabled ? "Enable" : "Disable" }}
    .upgradeData
      div
        h3 Upgrades
        p(v-if="upgrades.length == 0") No upgrades available.
        div(v-else)
          div(v-for="upgrade in upgrades" :key="upgrade.id")
            upgrade-component(:upgrade="upgrade" :resources="resources")
</template>

<script lang="ts">
import Vue from 'vue'
import EventBus from '../eventBus';

import GameObject from '../classes/gameObject/GameObject';
import { Idea } from '../classes/Idea';
import { IPopulation, IResource,IResourcesData } from '../classes/baseClasses';
import filters from "../filters";
import typeGuards from "../classes/typeGuards";

import CurrencyValueComponent from "./CurrencyValue.vue";
import PriceComponent from "./Price.vue";
import UpgradeComponent from "./Upgrade.vue";
import PopulationComponent from "./Population.vue";
import { getPriceCurrencies, canBeBought } from '../classes/helpers';

export default Vue.extend({
  props: {
    gameObject: Object as () => GameObject,
    resources: Object as () => IResourcesData,
    upgrades: Array as () => Idea[],
    population: Object as () => IPopulation
  },
  components: {
    'currency-value-component': CurrencyValueComponent,
    'price-component': PriceComponent,
    'upgrade-component': UpgradeComponent,
    'population-component': PopulationComponent
  },
  methods: {
    emitBuyEvent: function() {
      EventBus.$emit('game-event', { type: 'buy', value: this.gameObject.id });
    },
    emitDisableEvent: function() {
      EventBus.$emit('game-event', { type: 'disable', value: this.gameObject.id });
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.gameObject, this.resources, this.population);
    },
    hasConsumption: function(): boolean {
      return typeGuards.isBuilding(this.gameObject) && typeof this.gameObject.consumption !== 'undefined';
    },
    hasProduction: function(): boolean {
      return typeGuards.isBuilding(this.gameObject) && typeof this.gameObject.production !== 'undefined';
    },
    hasStorage: function(): boolean {
      return typeGuards.isBuilding(this.gameObject) && typeof this.gameObject.storage !== 'undefined';
    },
    canBeDisabled: function(): boolean {
      return typeGuards.isBuilding(this.gameObject);
    }
  }
})
</script>

<style scoped>
  .miniGrid {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 10% 90%;
  }

  .gridHeader {
    grid-column: 1;
    grid-row: 1;
  }

  .mainData {
    grid-column: 1;
    grid-row: 2;
  }

  .upgradeData {
    margin-left: 1rem;
    grid-column: 2;
    grid-row: 2;
  }

  .disableButton {
    float: right;
  }
</style>
