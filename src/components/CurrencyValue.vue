<template>
  <div v-if="values.length > 0">
    <p><slot></slot></p>
    <ul>
      <div v-for="p in values" :key="p.currency">
        <li :class="{ lacking: resources[p.currency].amount < p.amount }">{{ p.amount | decimal }} {{ p.currency }}</li>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { CurrencyValue, Map, IResource } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    values: Array as () => CurrencyValue[],
    resources: Object as () => Map<IResource>
  },
  filters
})
</script>

<style scoped>
  .lacking {
    color: #dc322f;
  }
</style>
