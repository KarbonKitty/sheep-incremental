<template lang="pug">
  div
    p Goal:
    p(v-if="!allVisible") You need to discover more resources to view entire goal!
    ul
      div(v-for="(amount, currency) in values" :key="currency")
        li(v-if="resourceAvailable(currency)") {{ resources[currency].amount | decimal(resources[currency].precision) }} / {{ amount | decimal(resources[currency].precision) }} {{ resources[currency].name }}
    button.btn(:disabled="!canComplete" @click="finish") {{ canComplete ? "Complete!" : "Not enough resources" }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Map, IResource, Price, Currency, IResourcesData } from "../classes/baseClasses";
import filters from "../filters";
import EventBus from "../eventBus";

export default Vue.extend({
  props: {
    values: Object as () => Price,
    resources: Object as () => IResourcesData
  },
  computed: {
    allVisible: function(): boolean {
      return Object.keys(this.values).reduce((acc, k) => acc && this.resources[k].locks.length === 0, true);
    },
    canComplete: function(): boolean {
      return Object.keys(this.values).reduce((acc, k) => acc && this.resources[k].amount >= (this.values[k] as number), true);
    }
  },
  methods: {
    resourceAvailable: function(currency: Currency): boolean {
      return this.resources[currency].locks.length === 0;
    },
    finish: function() {
      EventBus.$emit('game-event', { type: 'prestige', value: 'start' });
    }
  },
  filters
})
</script>
