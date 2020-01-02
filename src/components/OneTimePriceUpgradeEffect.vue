<template lang="pug">
  div
    p {{ objectName | capitalize }} {{ effect.affectedProperty }}:
    ul
      li(v-for="(amount, currency) in effect.scale" :key="currency")
        span(v-if="effect.type === 'add'") {{ currency }}: {{ amount | signed }}
        span(v-else) {{ currency }}: {{ 100 * (amount - 1) | signed }}%
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { UpgradeEffect } from "../classes/core";

export default baseComponent.extend({
  props: {
    effect: Object as () => UpgradeEffect
  },
  computed: {
    objectName: function(): string {
      // TODO: error handling
      return this.gameObjects.filter(o => o.id === this.effect.affectedObjectId)[0].name;
    }
  }
});
</script>

