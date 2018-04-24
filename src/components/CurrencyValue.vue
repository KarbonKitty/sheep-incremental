<template>
  <div v-if="values.length > 0">
    <p><slot></slot></p>
    <ul>
      <div v-for="p in values" :key="p.currency">
        <li>{{ p.amount | decimal }} {{ p.currency }}</li>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { CurrencyValue } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    values: Array as () => CurrencyValue[]
  },
  filters
})
</script>
