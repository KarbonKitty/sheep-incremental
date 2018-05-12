<template>
  <div v-if="Object.keys(values).length !== 0">
    <p><slot></slot></p>
    <ul>
      <div v-for="(amount, currency) in values" :key="currency">
        <li v-if="resources[currency].locks.length === 0">{{ amount | decimal(resources[currency].precision) }} {{ resources[currency].name }}</li>
      </div>
    </ul>
  </div>
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
