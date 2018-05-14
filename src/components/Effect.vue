<template>
  <div>
    <p>{{ effect.affectedProperty | capitalize }}:</p>
    <ul>
      <li v-for="(amount, currency) in effect.scale" :key="currency">
        <span v-if="effect.type === 'add'">{{ currency }}: {{ sign * amount | signed }} / sec</span>
        <span v-else>{{ currency }}: {{ 100 * sign * (amount - 1) | signed }}%</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { UpgradeEffect } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    effect: Object as () => UpgradeEffect
  },
  computed: {
    sign: function(): number {
      return this.effect.affectedProperty == "consumption" ? -1 : 1;
    }
  },
  filters
});
</script>

