<template>
  <div v-if="producer.locks.length === 0" class="producer" @click="changeSelection">
    <p><strong>{{ producer.name }} ({{ producer.quantity }})</strong></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import IProducer from "../classes/IProducer";

import filters from "../filters";

export default Vue.extend({
  methods: {
    changeSelection: function() {
      this.$parent.$emit('game-event', { type: 'change-selection', value: this.producer.id });
    }
  },
  props: {
    producer: Object as () => IProducer
  },
  filters
});
</script>

<style scoped>
  .producer {
    text-align: center;
    padding: 0 0.25rem;
    margin: 0.125rem 0;
    border: 1px solid #839496;
    border-radius: 4px;
    width: 200px;
    cursor: pointer;
  }

  .producer > p {
    margin: 0.5rem 0;
  }
</style>
