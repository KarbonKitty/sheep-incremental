<template lang="pug">
  div(v-if="gameObject.locks.length === 0 && !gameObject.done" class="gameObject" @click="changeSelection" :class="{ available: canBeBought }")
    p.
      {{ gameObject.name }} #[span(v-if="typeof gameObject.quantity === 'number'") ({{ gameObject.quantity }})] #[span(v-if="hasAvailableUpgrades") ⮝]
</template>

<script lang="ts">
import Vue from "vue";
import EventBus from "../eventBus";
import GameObject from "../classes/gameObject/GameObject";
import { Idea } from "../classes/Idea";
import { IResourcesData } from "../classes/baseClasses";
import { PriceHelper } from "../classes/helpers";

export default Vue.extend({
  methods: {
    changeSelection: function() {
      EventBus.$emit('game-event', { type: 'change-selection', value: this.gameObject.id });
    }
  },
  props: {
    gameObject: Object as () => GameObject,
    resources: Object as () => IResourcesData,
    upgrades: Array as () => Idea[]
  },
  computed: {
    canBeBought: function(): boolean {
      return PriceHelper.canBePaid(this.gameObject.currentPrice, this.resources);
    },
    hasAvailableUpgrades: function(): boolean {
      return this.upgrades.filter(u => PriceHelper.canBePaid(u.currentPrice, this.resources)).length > 0;
    }
  }
});
</script>

<style scoped>
  .gameObject {
    text-align: center;
    padding: 0 0.25rem;
    margin: 0.125rem;
    border: 1px solid #839496;
    border-radius: 4px;
    width: 200px;
    cursor: pointer;
  }

  .gameObject > p {
    margin: 0.5rem 0;
  }

  .available {
    font-weight: bold;
    background-color: #073642;
  }
</style>
