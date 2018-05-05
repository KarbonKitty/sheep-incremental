<template>
  <div>
    <h3>{{ building.name }}</h3>
    <p>{{ building.desc }}</p>
    <currency-value-component :values="building.currentPrice">Price:</currency-value-component>
    <currency-value-component v-if="typeof building.consumption !== 'undefined'" :values="building.consumption">Inputs:</currency-value-component>
    <currency-value-component v-if="typeof building.production !== 'undefined'" :values="building.production">Outputs:</currency-value-component>
    <currency-value-component v-if="typeof building.storage !== 'undefined'" :values="building.storage">Storage:</currency-value-component>
    <button class="btn buyButton" @click="emitBuyEvent">{{ building.buyVerb }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CurrencyValue } from '../classes/baseClasses';
import CurrencyValueComponent from "./CurrencyValue.vue";
import filters from "../filters";
import GameObject from '../classes/gameObject/GameObject';
import IBuyable from "../classes/IBuyable";

export default Vue.extend({
  props: {
    building: Object as () => GameObject & IBuyable
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
