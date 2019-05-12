<template lang="pug">
  .miniGrid
    .gridHeader
      h2 Object details
    .mainData
      h3 {{ expedition.name }}
      p {{ expedition.desc }}
      p Length: #[strong {{ expedition.template.length | timeLeft }}]
      price-component(:values="expedition.currentPrice") Price:
      reward-details-component(:reward="expedition.template.reward") Rewards:
      button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ expedition.buyVerb }}
    .currentData
      div
        h3 Current Expedition
        p(v-if="expedition.timeLeftToComplete > 0") Time left: {{ expedition.timeLeftToComplete | timeLeft }}
        p(v-else) This expedition is not currently in progress.
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { Expedition } from '../classes/Expedition';
import typeGuards from "../classes/typeGuards";

import PriceComponent from "./Price.vue";
import RewardDetailsComponent from "./RewardDetails.vue";
import { canBeBought } from '../classes/helpers';

export default baseComponent.extend({
  props: {
    expedition: Object as () => Expedition
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
    },
    isInProgress: function(): boolean {
      return typeGuards.isExpedition(this.expedition) && this.expedition.timeLeftToComplete > 0;
    }
  }
});
</script>

<style scoped lang="stylus">
  .miniGrid
    display grid
    grid-template-columns 50% 50%
    grid-template-rows 10% 90%

  .gridHeader
    grid-column 1
    grid-row 1

  .mainData
    grid-column 1
    grid-row 2

  .currentData
    margin-left 1rem
    grid-column 2
    grid-row 2

  .disableButton
    float right
</style>
