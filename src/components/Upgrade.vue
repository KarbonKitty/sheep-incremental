<template lang="pug">
  div
    .upgradeButton(@click="switchDetails")
      p {{ upgrade.name }}
    .details(v-if="details")
      p {{ upgrade.desc }}
      price-component(:values="upgrade.currentPrice" :resources="resources") Price:
      div(v-for="effect in upgrade.template.effects" :key="effect.property")
        dynamic-effect-component(:effect="effect" v-if="effect.affectedProperty === 'production' || effect.affectedProperty === 'consumption'")
        static-effect-component(:effect="effect" v-else)
      button.btn(@click="emitBuyEvent" :disabled="!canBePaid") {{ upgrade.buyVerb }}
</template>

<script lang="ts">
import Vue from "vue";
import EventBus from "../eventBus";

import { Idea } from "../classes/Idea";
import { IResourcesData } from "../classes/baseClasses";
import { getPriceCurrencies } from "../classes/helpers";

import PriceComponent from "./Price.vue";
import DynamicEffectComponent from "./DynamicEffect.vue";
import StaticEffectComponent from "./StaticEffect.vue";

import filters from "../filters";

export default Vue.extend({
  props: {
    upgrade: Object as () => Idea,
    resources: Object as () => IResourcesData
  },
  data: function() {
    return {
      details: false
    };
  },
  methods: {
    emitBuyEvent: function() {
      EventBus.$emit("game-event", {
        type: "buy",
        value: this.upgrade.id
      });
    },
    switchDetails() {
      this.details = !this.details;
    }
  },
  computed: {
    canBePaid: function(): boolean {
      return this.$store.getters.canBePaid(this.upgrade.currentPrice);
    }
  },
  components: {
    "price-component": PriceComponent,
    "dynamic-effect-component": DynamicEffectComponent,
    "static-effect-component": StaticEffectComponent
  },
  filters
});
</script>

<style scoped lang="stylus">
.upgradeButton
  text-align center
  padding 0 0.25rem
  margin 0.125rem
  border 1px solid $base0
  border-radius 4px
  width 200px
  cursor pointer

.upgradeButton > p
  margin 0.5rem 0

.details
  margin 0 0 1rem 1rem
</style>

