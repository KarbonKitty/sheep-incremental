<template>
  <div v-if="values.length > 0">
    <p>Goal:</p>
    <p v-if="!allVisible">You need to discover more resources to view entire goal!</p>
    <ul>
      <div v-for="p in values" :key="p.currency">
        <li v-if="resourceAvailable(p)">{{ p.amount | decimal(resources[p.currency].precision) }} {{ resources[p.currency].name }}</li>
      </div>
    </ul>
    <button :disabled="!canComplete" @click="finish" class="btn">{{ canComplete ? "Complete!" : "Not enough resources" }}</button>
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
  computed: {
    allVisible: function(): boolean {
      return this.values.reduce((acc, val) => acc && this.resources[val.currency].locks.length === 0, true);
    },
    canComplete: function(): boolean {
      return this.values.reduce((acc, val) => acc && this.resources[val.currency].amount >= val.amount, true);
    }
  },
  methods: {
    resourceAvailable: function(curVal: CurrencyValue): boolean {
      return this.resources[curVal.currency].locks.length === 0;
    },
    finish: function() {
      alert("Congratulations! You have finished the current portion of the Sheep Tribe!");
    }
  },
  filters
})
</script>

<style scoped>
  button:disabled {
    background-color: #073642;
    color: #657b83;
  }
</style>
