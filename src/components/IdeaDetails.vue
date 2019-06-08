<template lang="pug">
  div
    h2 {{ idea.name }}
    p {{ idea.desc }}
    price-component(:values="idea.currentPrice") Price:
    div(v-for="effect in idea.template.effects" :key="effect.property")
      per-tick-price-upgrade-effect-component(:effect="effect" v-if="effect.affectedProperty === 'production' || effect.affectedProperty === 'consumption'")
      one-time-price-upgrade-effect-component(:effect="effect" v-else-if="effect.affectedProperty === 'price' || effect.affectedProperty === 'storage'")
      reward-upgrade-effect-component(:effect="effect" v-else)
    button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ idea.buyVerb }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { Idea } from '../classes/Idea';
import CurrencyValueComponent from "./CurrencyValue.vue";
import PerTickPriceUpgradeEffectComponent from "./PerTickPriceUpgradeEffect.vue";
import OneTimePriceUpgradeEffectComponent from "./OneTimePriceUpgradeEffect.vue";
import RewardUpgradeEffectComponent from "./RewardUpgradeEffect.vue";
import PriceComponent from "./Price.vue";
import { canBeBought } from '../classes/helpers';

export default baseComponent.extend({
  props: {
    idea: Object as () => Idea
  },
  components: {
    'price-component': PriceComponent,
    'per-tick-price-upgrade-effect-component': PerTickPriceUpgradeEffectComponent,
    'one-time-price-upgrade-effect-component': OneTimePriceUpgradeEffectComponent,
    'reward-upgrade-effect-component': RewardUpgradeEffectComponent
  },
  methods: {
    emitBuyEvent: function() {
      this.$engineEvents.buyItem(this.idea.id);
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.idea, this.resources);
    },
    isUpgrade: function(): boolean {
      return typeof this.idea.template.effects !== 'undefined' && this.idea.template.effects.length > 0;
    }
  }
});
</script>

<style scoped lang="stylus">
  .disableButton
    float right
</style>
