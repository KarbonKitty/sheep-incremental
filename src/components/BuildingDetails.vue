<template>
  <div>
    <h3>{{ building.name }}</h3>
    <p>{{ building.desc }}</p>
    <currency-value-component :values="realCost">Price:</currency-value-component>
    <currency-value-component :values="building.consumption">Inputs:</currency-value-component>
    <currency-value-component :values="building.production">Outputs:</currency-value-component>
    <button class="btn buyButton" @click="emitBuyEvent">{{ building.buyVerb }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CurrencyValue } from '../classes/baseClasses';
import IBuyable from '../classes/IBuyable';
import CurrencyValueComponent from "./CurrencyValue.vue";
import BuyableEngine from "../engine/buyableEngine";
import filters from "../filters";

export default Vue.extend({
  props: {
    building: Object as () => IBuyable
  },
  computed: {
    realCost(): CurrencyValue[] {
      return BuyableEngine.getRealCost(this.building);
    }
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
