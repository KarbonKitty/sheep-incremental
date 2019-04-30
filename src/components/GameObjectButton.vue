<template lang="pug">
  .selectButton(v-if="gameObject.isAvailable()" @click="changeSelection" :class="{ available: canBeBought, active: active }")
    p.
      {{ gameObject.name }} #[span(v-if="typeof gameObject.quantity === 'number'") ({{ gameObject.quantity }})] #[span(v-if="hasAvailableUpgrades") ⮝] #[span(v-if="gameObject.disabled") 🛇] #[span(v-if="expeditionInProgress" class="spin") ⚙]
</template>

<script lang="ts">
import Vue from "vue";
import EventBus from "../eventBus";
import GameObject from "../classes/gameObject/GameObject";
import { Idea } from "../classes/Idea";
import { IPopulation, IResourcesData } from "../classes/baseClasses";
import typeGuards from "../classes/typeGuards";

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
      return this.$store.getters.canBeBought(this.gameObject);
    },
    hasAvailableUpgrades: function(): boolean {
      return this.upgrades.filter(u => u.isAvailable() && this.$store.getters.canBePaid(u.currentPrice)).length > 0;
    },
    expeditionInProgress: function(): boolean {
      return typeGuards.isExpedition(this.gameObject) && this.gameObject.timeLeftToComplete > 0;
    }
  }
});
</script>

<style scoped lang="stylus">
  .active
    border-color $green
    color $green

  .spin
    display inline-block
    animation spin 4s linear infinite

  @keyframes spin
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
</style>
