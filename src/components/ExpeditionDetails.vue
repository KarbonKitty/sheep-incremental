<template lang="pug">
  .miniGrid
    .gridHeader
      h2 Object details
    .mainData
      h3 {{ expedition.name }}
      p {{ expedition.desc }}
      price-component(:values="expedition.currentPrice" :resources="resources") Price:
      currency-value-component(:values="expedition.template.reward" :resources="resources") Reward:
      button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ expedition.buyVerb }}
    .currentData
      div
        h3 Current Expedition
        p(v-if="expedition.timeLeftToComplete > 0") Time left: {{ expedition.timeLeftToComplete / 1000 | decimal(1) }} s
        p(v-else) This expedition is not currently in progress.
</template>

<script lang="ts">
import Vue from 'vue'
import EventBus from '../eventBus';

import { Expedition } from '../classes/Expedition';
import { IPopulation, IResource,IResourcesData } from '../classes/baseClasses';
import filters from "../filters";
import typeGuards from "../classes/typeGuards";

import CurrencyValueComponent from "./CurrencyValue.vue";
import PriceComponent from "./Price.vue";
import { getPriceCurrencies, canBeBought } from '../classes/helpers';

export default Vue.extend({
  props: {
    expedition: Object as () => Expedition,
    resources: Object as () => IResourcesData
  },
  components: {
    'currency-value-component': CurrencyValueComponent,
    'price-component': PriceComponent
  },
  methods: {
    emitBuyEvent: function() {
      EventBus.$emit('game-event', { type: 'buy', value: this.expedition.id });
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.expedition, this.resources);
    },
    isInProgress: function(): boolean {
      return typeGuards.isExpedition(this.expedition) && this.expedition.timeLeftToComplete > 0;
    }
  },
  filters
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

  .currentData {
    margin-left: 1rem;
    grid-column: 2;
    grid-row: 2;
  }

  .disableButton {
    float: right;
  }
</style>
