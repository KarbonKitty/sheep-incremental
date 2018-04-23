<template>
  <div>
    <h3>{{ building.name }}</h3>
    <p>{{ building.desc }}</p>
    <currency-value-component :values="building.cost">Price:</currency-value-component>
    <currency-value-component :values="building.consumption">Inputs:</currency-value-component>
    <currency-value-component :values="building.production">Outputs:</currency-value-component>
    <button class="btn buyButton" @click="emitBuyEvent">{{ building.buyVerb }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import IBuyable from '../classes/IBuyable';

import CurrencyValueComponent from "./CurrencyValue.vue";

import filters from "../filters";

export default Vue.extend({
  props: {
    building: Object as () => IBuyable
  },
  components: {
    'currency-value-component': CurrencyValueComponent
  },
  methods: {
    emitBuyEvent: function() {
      this.$parent.$emit('game-event', { type: 'buy', value: this.building.id });
    }
  }
})
</script>

<style scoped>
/* .buyButton {
    position: absolute;
    bottom: 8px;
    right: 8px;
  } */
</style>
