<template lang="pug">
  .miniGrid
    .mainData
      h3 {{ building.name }}
      p {{ building.desc }}
      price-component(:values="building.currentPrice" :resources="resources") Price:
      currency-value-component(v-if="hasConsumption" :values="building.currentConsumption" :resources="resources") Inputs:
      currency-value-component(v-if="hasProduction" :values="building.currentProduction" :resources="resources") Outputs:
      currency-value-component(v-if="hasStorage" :values="building.storage" :resources="resources") Storage:
      button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBePaid") {{ building.buyVerb }}
      button.btn.disableButton(v-if="canBeDisabled" @click="emitDisableEvent" :disabled="building.quantity === 0") {{ building.disabled ? "Enable" : "Disable" }}
    .upgradeData(v-if="upgrades.length > 0")
      p Available upgrades:
      div(v-for="upgrade in upgrades" :key="upgrade.id")
        upgrade-component(:upgrade="upgrade" :resources="resources")
</template>

<script lang="ts">
import Vue from 'vue'
import EventBus from '../eventBus';

import GameObject from '../classes/gameObject/GameObject';
import { Upgrade } from "../classes/upgrade/Upgrade";
import { IResource, IResourcesData } from '../classes/baseClasses';
import filters from "../filters";
import typeGuards from "../classes/typeGuards";

import CurrencyValueComponent from "./CurrencyValue.vue";
import PriceComponent from "./Price.vue";
import UpgradeComponent from "./Upgrade.vue";

export default Vue.extend({
  props: {
    building: Object as () => GameObject,
    resources: Object as () => IResourcesData,
    upgrades: Array as () => Upgrade[]
  },
  components: {
    'currency-value-component': CurrencyValueComponent,
    'price-component': PriceComponent,
    'upgrade-component': UpgradeComponent
  },
  methods: {
    emitBuyEvent: function() {
      EventBus.$emit('game-event', { type: 'buy', value: this.building.id });
    },
    emitDisableEvent: function() {
      EventBus.$emit('game-event', { type: 'disable', value: this.building.id });
    }
  },
  computed: {
    canBePaid: function(): boolean {
      return Object.keys(this.building.currentPrice).reduce((acc, cv) => acc && this.resources[cv].amount >= (this.building.currentPrice[cv] || 0), true);
    },
    hasConsumption: function(): boolean {
      if (typeGuards.isProducer(this.building)) {
        return Object.keys(this.building.rawConsumption).length > 0;
      }
      return false;
    },
    hasProduction: function(): boolean {
      return typeGuards.isProducer(this.building);
    },
    hasStorage: function(): boolean {
      return typeGuards.isStorage(this.building);
    },
    canBeDisabled: function(): boolean {
      return typeGuards.isProducer(this.building);
    }
  }
})
</script>

<style scoped>
  .miniGrid {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
  }

  .mainData {
    grid-column: 1;
    grid-row: 1;
  }

  .upgradeData {
    grid-column: 2;
    grid-row: 1;
  }

  .disableButton {
    float: right;
  }
</style>
