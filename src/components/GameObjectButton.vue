<template lang="pug">
  div(v-if="gameObject.locks.length === 0 && !gameObject.done" class="selectButton" @click="changeSelection" :class="{ available: canBeBought }")
    p.
      {{ gameObject.name }} #[span(v-if="typeof gameObject.quantity === 'number'") ({{ gameObject.quantity }})] #[span(v-if="hasAvailableUpgrades") ⮝]
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
    upgrades: Array as () => Idea[]
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
