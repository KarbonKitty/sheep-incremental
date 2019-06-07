<template lang="pug">
  .selectButton(v-if="gameObject.isAvailable()" @click="changeSelection" :class="{ available: canBeBought, active: active }")
    p.
      #[span(:class="iconClass")] {{ gameObject.name }} #[span(v-if="typeof gameObject.quantity === 'number'") ({{ gameObject.quantity }})] #[span(v-if="gameObject.disabled") 🛇]
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import GameObject from "../classes/gameObject/GameObject";
import { Idea } from "../classes/Idea";
import { canBeBought, canBePaid } from "../classes/helpers";
import typeGuards from "../classes/typeGuards";

export default baseComponent.extend({
  methods: {
    changeSelection: function() {
      this.$engineEvents.changeSelection(this.gameObject.id);
    }
  },
  props: {
    gameObject: Object as () => GameObject,
    upgrades: Array as () => Idea[],
    active: Boolean
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.gameObject, this.resources, this.population, this.sites);
    },
    hasAvailableUpgrades: function(): boolean {
      return this.upgrades.filter(u => u.isAvailable() && canBePaid(u.currentPrice, this.resources)).length > 0;
    },
    iconClass: function() {
      return {
        "fa-home": typeGuards.isBuilding(this.gameObject),
        "fa-arrow-up": typeGuards.isIdea(this.gameObject) && typeof this.gameObject.template.effects !== 'undefined',
        "fa-lightbulb": typeGuards.isIdea(this.gameObject) && typeof this.gameObject.template.unlocks !== 'undefined',
        "fa-route": typeGuards.isProject(this.gameObject),
        "fas": true
      }
    }
  }
});
</script>

<style scoped lang="stylus">
  .active
    border-color $green
    color $green
</style>
