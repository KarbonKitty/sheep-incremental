<template lang="pug">
  li(:class="{ lacking: notEnough }") {{ lackingStorage ? '✗' : '' }} {{ amount | decimal(resourcePrecision) }} {{ resourceName }}
</template>

<script lang="ts">
import Vue from 'vue';
import filters from "../filters";
import { IResourcesData, Currency } from '../classes/baseClasses';

export default Vue.extend({
  props: {
    amount: Number,
    currency: String as () => Currency,
    resources: Object as () => IResourcesData
  },
  computed: {
    notEnough: function() {
      return this.resources[this.currency].amount < this.amount;
    },
    lackingStorage: function () {
      return (this.resources[this.currency].limit || 0) < this.amount;
    },
    resourceName: function() {
      return this.resources[this.currency].template.name;
    },
    resourcePrecision: function() {
      return this.resources[this.currency].template.precision;
    }
  },
  filters
})
</script>

<style scoped>
  .lacking {
    color: #dc322f;
  }
</style>