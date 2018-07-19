<template lang="pug">
  .selectButton(v-if="gameObject.isAvailable()" @click="changeSelection" :class="{ available: canBeBought, active: active }")
    p.
      {{ gameObject.name }} #[span(v-if="typeof gameObject.quantity === 'number'") ({{ gameObject.quantity }})] #[span(v-if="hasAvailableUpgrades") ⮝] #[span(v-if="gameObject.disabled") 🛇]
</template>

<script lang="ts">
import Vue from "vue";
import EventBus from "../eventBus";
import GameObject from "../classes/gameObject/GameObject";
import { Idea } from "../classes/Idea";
import { IPopulation, IResourcesData } from "../classes/baseClasses";
import { canBeBought, canBePaid } from "../classes/helpers";

export default Vue.extend({
  methods: {
    changeSelection: function() {
      EventBus.$emit('game-event', { type: 'change-selection', value: this.gameObject.id });
    }
  },
  props: {
    gameObject: Object as () => GameObject,
    resources: Object as () => IResourcesData,
    population: Object as () => IPopulation,
    upgrades: Array as () => Idea[],
    active: Boolean
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.gameObject, this.resources, this.population);
    },
    hasAvailableUpgrades: function(): boolean {
      return this.upgrades.filter(u => canBePaid(u.currentPrice, this.resources)).length > 0;
    }
  }
});
</script>

<style scoped>
  .active {
    border-color: #859900;
    color: #859900;
  }
</style>
