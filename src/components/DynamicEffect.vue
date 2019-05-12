<template lang="pug">
  div
    p {{ effect.affectedProperty | capitalize }}:
    ul
      li(v-for="(amount, currency) in effect.scale" :key="currency")
        span(v-if="effect.type === 'add'") {{ currency }}: {{ sign * amount | signed }} / sec
        span(v-else) {{ currency }}: {{ 100 * sign * (amount - 1) | signed }}%
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { UpgradeEffect } from "../classes/baseClasses";

export default baseComponent.extend({
  props: {
    effect: Object as () => UpgradeEffect
  },
  computed: {
    sign: function(): number {
      return this.effect.affectedProperty === "consumption" ? -1 : 1;
    }
  }
});
</script>

