<template lang="pug">
  .miniGrid
    .gridHeader
      h2 Object details
    .mainData
      h3 {{ building.name }}
      p {{ building.desc }}
      price-component(:values="building.currentPrice") Price:
      population-component(:employees="building.template.employees" :housing="building.template.housing")
      sites-component(v-if="typeof building.template.requiredSite !== 'undefined'" :requiredSite="building.template.requiredSite")
      currency-value-component(v-if="hasConsumption" :values="building.consumption.getTotal()") Inputs:
      currency-value-component(v-if="hasProduction" :values="building.production.getTotal()") Outputs:
      currency-value-component(v-if="hasStorage" :values="building.storage.getTotal()") Storage:
      button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ building.buyVerb }}
      button.btn.disableButton(v-if="canBeDisabled" @click="emitDisableEvent" :disabled="building.quantity === 0") {{ building.disabled ? "Enable" : "Disable" }}
    .upgradeData
      div
        h3 Upgrades
        p(v-if="upgrades.length == 0") No upgrades available.
        div(v-else)
          div(v-for="upgrade in upgrades" :key="upgrade.id")
            upgrade-component(:upgrade="upgrade")
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { Idea } from '../classes/Idea';
import { Building } from '../classes/Building';
import { IPopulation, IResource, IResourcesData } from '../classes/baseClasses';
import typeGuards from "../classes/typeGuards";
import { getPriceCurrencies, canBeBought } from '../classes/helpers';

import CurrencyValueComponent from "./CurrencyValue.vue";
import PriceComponent from "./Price.vue";
import UpgradeComponent from "./Upgrade.vue";
import PopulationComponent from "./Population.vue";
import SitesComponent from "./Site.vue";

export default baseComponent.extend({
  props: {
    building: Object as () => Building,
    upgrades: Array as () => Idea[]
  },
  components: {
    'currency-value-component': CurrencyValueComponent,
    'price-component': PriceComponent,
    'upgrade-component': UpgradeComponent,
    'population-component': PopulationComponent,
    'sites-component': SitesComponent
  },
  methods: {
    emitBuyEvent: function() {
      this.$engineEvents.buyItem(this.building.id);
    },
    emitDisableEvent: function() {
      this.$engineEvents.disableItem(this.building.id);
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.building, this.resources, this.population, this.sites);
    },
    hasConsumption: function(): boolean {
      return typeof this.building.consumption !== 'undefined';
    },
    hasProduction: function(): boolean {
      return typeof this.building.production !== 'undefined';
    },
    hasStorage: function(): boolean {
      return typeof this.building.storage !== 'undefined';
    },
    canBeDisabled: function(): boolean {
      return true;
    }
  }
});
</script>

<style scoped lang="stylus">
  .miniGrid
    display grid
    grid-template-columns 50% 50%
    grid-template-rows 10% 90%

  .gridHeader
    grid-column 1
    grid-row 1

  .mainData
    grid-column 1
    grid-row 2

  .upgradeData
    margin-left 1rem
    grid-column 2
    grid-row 2

  .disableButton
    float right
</style>
