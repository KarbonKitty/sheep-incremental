<template lang="pug">
  div
    h2 {{ expedition.name }}
    p {{ expedition.desc }}
    p Length: #[strong {{ expedition.template.length | timeLeft }}]
    price-component(:values="expedition.currentPrice") Price:
    reward-details-component(:reward="expedition.template.reward") Rewards:
    button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ expedition.buyVerb }}

</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { ExpeditionPlan } from '../classes/ExpeditionPlan';
import typeGuards from "../classes/typeGuards";

import PriceComponent from "./Price.vue";
import RewardDetailsComponent from "./RewardDetails.vue";
import { canBeBought } from '../classes/helpers';

export default baseComponent.extend({
  props: {
    expedition: Object as () => ExpeditionPlan
  },
  components: {
    'price-component': PriceComponent,
    'reward-details-component': RewardDetailsComponent
  },
  methods: {
    emitBuyEvent: function() {
      this.$engineEvents.buyItem(this.expedition.id);
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.expedition, this.resources);
    }
  }
});
</script>

<style scoped lang="stylus">
  .disableButton
    float right
</style>
