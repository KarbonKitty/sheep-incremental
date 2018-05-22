<template lang="pug">
  div
    p
      slot
    ul
      div(v-for="(amount, currency) in values" :key="currency")
        li(:class="{ lacking: typeof resources[currency] !== 'undefined' && resources[currency].amount < amount }") {{ amount | decimal(resources[currency].precision) }} {{ resources[currency].name }}
</template>

<script lang="ts">
import Vue from 'vue'

import { Price, IResourcesData } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    values: Object as () => Price,
    resources: Object as () => IResourcesData
  },
  filters
})
</script>

<style scoped>
  .lacking {
    color: #dc322f;
  }
</style>
