<template>
  <div v-if="producer.visible" class="producer">
    <h3>{{ producer.quantity }} {{ producer.name }}</h3>
    <p>{{ producer.desc }}</p>
    <cost-component :price="producer.cost"></cost-component>
    <button class="btn buyButton" @click="emitBuyEvent">{{ producer.buyVerb }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CostComponent from "./Cost.vue";

import IProducer from "../classes/IProducer";

import filters from "../filters";

export default Vue.extend({
  template: ``,
  methods: {
    emitBuyEvent: function() {
      this.$parent.$emit('game-event', { type: 'buy', value: this.producer.id});
    }
  },
  props: [ 'producer' ],
  components: {
    'cost-component': CostComponent
  },
  filters
});
</script>

<style scoped>
  .producer {
    margin: 0 20px 0 0;
    padding: 8px;
    border: 1px solid #839496;
    border-radius: 4px;
    width: 250px;
    height: 100%;
    position: relative;
  }

  .buyButton {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
</style>
