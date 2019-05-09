<template lang="pug">
  .miniGrid
    .gridHeader
      h2 Object details
    .mainData
      h3 {{ discovery.name }}
      p {{ discovery.desc }}
      price-component(:values="discovery.currentPrice") Price:
      button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ discovery.buyVerb }}
</template>

<script lang="ts">
import Vue from 'vue';

import { Idea } from '../classes/Idea';
import filters from "../filters";

import CurrencyValueComponent from "./CurrencyValue.vue";
import PriceComponent from "./Price.vue";
import { canBeBought } from '../classes/helpers';

export default Vue.extend({
  props: {
    discovery: Object as () => Idea
  },
  components: {
    'currency-value-component': CurrencyValueComponent,
    'price-component': PriceComponent
  },
  methods: {
    emitBuyEvent: function() {
      this.$engineEvents.buyItem(this.discovery.id);
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.discovery, this.$resources);
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
