<template>
  <div v-if="Array.isArray(price)">
    <p>Price:</p>
    <ul>
      <div v-for="p in price" :key="p.currency">
        <li>{{ p.amount }} {{ p.currency }}</li>
      </div>
    </ul>
  </div>
  <div v-else>
    <p>Price: {{ price.amount }} {{ price.currency }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { SingleCost } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    price: Array as () => SingleCost[]
  },
  filters
})
</script>
