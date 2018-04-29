<template>
  <div>
    <h3>{{ building.name }}</h3>
    <p>{{ building.desc }}</p>
    <currency-value-component :values="building.getCurrentPrice()">Price:</currency-value-component>
    <currency-value-component v-if="typeof building.consumption !== 'undefined'" :values="building.consumption">Inputs:</currency-value-component>
    <currency-value-component v-if="typeof building.production !== 'undefined'" :values="building.production">Outputs:</currency-value-component>
    <button class="btn buyButton" @click="emitBuyEvent">{{ building.buyVerb }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CurrencyValue } from '../classes/baseClasses';
import CurrencyValueComponent from "./CurrencyValue.vue";
import filters from "../filters";
import IGameObject from '../classes/IGameObject';
import IBuyable from "../classes/IBuyable";

export default Vue.extend({
  props: {
    building: Object as () => IGameObject & IBuyable
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
