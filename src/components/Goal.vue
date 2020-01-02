<template lang="pug">
  div
    h4 Goal
    p(v-if="!allVisible") You need to discover more resources to view entire goal!
    ul
      div(v-for="(amount, currency) in values" :key="currency")
        li(is="goal-item-component" v-if="resourceAvailable(currency)" :amount="amount" :currency="currency")
    button.btn(:disabled="!canComplete" @click="finish") {{ canComplete ? "Complete!" : "Not enough resources" }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { Price, Currency } from "../classes/core";
import { getPriceCurrencies, canBePaid } from '../classes/helpers';
import GoalItemComponent from "./GoalItem.vue";

export default baseComponent.extend({
  props: {
    values: Object as () => Price
  },
  computed: {
    allVisible: function(): boolean {
      return getPriceCurrencies(this.values).reduce((acc, k) => acc && this.resources[k].locks.length === 0, true);
    },
    canComplete: function(): boolean {
      return canBePaid(this.values, this.resources);
    }
  },
  methods: {
    resourceAvailable: function(currency: Currency): boolean {
      return this.resources[currency].locks.length === 0;
    },
    finish: function() {
      this.$engineEvents.startPrestige();
    }
  },
  components: {
    'goal-item-component': GoalItemComponent
  }
});
</script>
