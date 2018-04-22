<template>
  <div v-if="producer.visible" class="producer">
    <h3>{{ producer.quantity }} {{ producer.name }}</h3>
    <p>{{ producer.desc }}</p>
    <cost-component :price="producer.cost"></cost-component>
    <button class="btn" @click="emitBuyEvent">{{ producer.buyVerb }}</button>
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
  }
</style>
