<template lang="pug">
  div
    div(v-if="typeof employees !== 'undefined' && employees > 0")
      p Workers needed:
      ul
        li(:class="{ lacking: lacking }") {{ employees }} sheep
    div(v-if="typeof housing !== 'undefined' && housing > 0")
      p Housing:
      ul
        li {{ housing }} sheep
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

export default baseComponent.extend({
  props: {
    employees: Number,
    housing: Number
  },
  computed: {
    lacking(): boolean {
      return (this.population.population - this.population.workers) < this.employees;
    }
  }
});
</script>

<style scoped lang="stylus">
  .lacking
    color $red
</style>
