<template lang="pug">
  .miniGrid
    .gridHeader
      h2 Object details
    .mainData
      h3 {{ discovery.name }}
      p {{ discovery.desc }}
      price-component(:values="discovery.currentPrice" :resources="resources") Price:
      button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ discovery.buyVerb }}
</template>

<script lang="ts">
import Vue from 'vue'
import EventBus from '../eventBus';

import { Idea } from '../classes/Idea';
import { IResource, IResourcesData } from '../classes/baseClasses';
import filters from "../filters";
import typeGuards from "../classes/typeGuards";

import CurrencyValueComponent from "./CurrencyValue.vue";
import PriceComponent from "./Price.vue";
import { getPriceCurrencies, canBeBought } from '../classes/helpers';

export default Vue.extend({
  props: {
    discovery: Object as () => Idea,
    resources: Object as () => IResourcesData
  },
  components: {
    'currency-value-component': CurrencyValueComponent,
    'price-component': PriceComponent
  },
  methods: {
    emitBuyEvent: function() {
      EventBus.$emit('game-event', { type: 'buy', value: this.discovery.id });
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.discovery, this.resources);
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
