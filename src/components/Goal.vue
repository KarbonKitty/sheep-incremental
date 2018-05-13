<template>
  <div>
    <p>Goal:</p>
    <p v-if="!allVisible">You need to discover more resources to view entire goal!</p>
    <ul>
      <div v-for="(amount, currency) in values" :key="currency">
        <li v-if="resourceAvailable(currency)">{{ amount | decimal(resources[currency].precision) }} {{ resources[currency].name }}</li>
      </div>
    </ul>
    <button :disabled="!canComplete" @click="finish" class="btn">{{ canComplete ? "Complete!" : "Not enough resources" }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Map, IResource, Price, Currency, IResourcesData } from "../classes/baseClasses";
import filters from "../filters";

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
      alert("Congratulations! You have finished the current portion of the Sheep Tribe!");
    }
  },
  filters
})
</script>
