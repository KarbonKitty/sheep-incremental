<template lang="pug">
  div
    div(v-if="typeof employees !== 'undefined' && employees > 0")
      p Workers needed:
      ul
        li(:class="{ lacking: population.population - population.workers < employees }") {{ employees }} sheep
    div(v-if="typeof housing !== 'undefined' && housing > 0")
      p Housing:
      ul
        li {{ housing }} sheep
</template>

<script lang="ts">
import Vue from 'vue';

import filters from "../filters";
import { IPopulation } from '../classes/baseClasses';

export default Vue.extend({
  props: {
    employees: Number,
    housing: Number,
    population: Object as () => IPopulation
  },
  filters
});
</script>

<style scoped lang="stylus">
  .lacking
    color $red
</style>
