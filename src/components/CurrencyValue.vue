<template>
  <div v-if="values.length > 0">
    <p><slot></slot></p>
    <ul>
      <div v-for="p in values" :key="p.currency">
        <li v-if="resources[p.currency].locks.length === 0">{{ p.amount | decimal(resources[p.currency].precision) }} {{ resources[p.currency].name }}</li>
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
