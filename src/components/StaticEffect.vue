<template lang="pug">
  div
    p {{ effect.affectedProperty | capitalize }}:
    ul
      li(v-for="(amount, currency) in effect.scale" :key="currency")
        span(v-if="effect.type === 'add'") {{ currency }}: {{ amount | signed }}
        span(v-else) {{ currency }}: {{ 100 * (amount - 1) | signed }}%
</template>

<script lang="ts">
import Vue from "vue";

import { UpgradeEffect } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    effect: Object as () => UpgradeEffect
  },
  filters
});
</script>

