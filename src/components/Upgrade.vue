<template lang="pug">
  div
    .upgradeButton(@click="switchDetails")
      p {{ upgrade.name }}
    .details(v-if="details")
      p {{ upgrade.desc }}
      price-component(:values="upgrade.currentPrice" :resources="resources") Price:
      div(v-for="effect in upgrade.effects" :key="effect.property")
        effect-component(:effect="effect")
      button.btn(@click="emitBuyEvent" :disabled="!canBePaid") {{ upgrade.buyVerb }}
</template>

<script lang="ts">
import Vue from "vue";
import EventBus from "../eventBus";

import { Upgrade } from "../classes/upgrade/Upgrade";
import { IResourcesData } from "../classes/baseClasses";

import PriceComponent from "./Price.vue";
import EffectComponent from "./Effect.vue";

import filters from "../filters";

export default Vue.extend({
  props: {
    upgrade: Object as () => Upgrade,
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
      return Object.keys(this.upgrade.currentPrice).reduce(
        (acc, cv) =>
          acc &&
          this.resources[cv].amount >= (this.upgrade.currentPrice[cv] || 0),
        true
      );
    }
  },
  components: {
    'price-component': PriceComponent,
    'effect-component': EffectComponent
  },
  filters
});
</script>

<style scoped>
.upgradeButton {
  text-align: center;
  padding: 0 0.25rem;
  margin: 0.125rem;
  border: 1px solid #839496;
  border-radius: 4px;
  width: 200px;
  cursor: pointer;
}

.upgradeButton > p {
  margin: 0.5rem 0;
}

.details {
  margin: 0 0 1rem 1rem;
}
</style>

