<template lang="pug">
  div
    h2 {{ idea.name }}
    p {{ idea.desc }}
    price-component(:values="idea.currentPrice") Price:
    div(v-for="effect in idea.template.effects" :key="effect.property")
      dynamic-effect-component(:effect="effect" v-if="effect.affectedProperty === 'production' || effect.affectedProperty === 'consumption'")
      static-effect-component(:effect="effect" v-else)
    button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ idea.buyVerb }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { Idea } from '../classes/Idea';
import CurrencyValueComponent from "./CurrencyValue.vue";
import DynamicEffectComponent from "./DynamicEffect.vue";
import StaticEffectComponent from "./StaticEffect.vue";
import PriceComponent from "./Price.vue";
import { canBeBought } from '../classes/helpers';

export default baseComponent.extend({
  props: {
    idea: Object as () => Idea
  },
  components: {
    'price-component': PriceComponent,
    "dynamic-effect-component": DynamicEffectComponent,
    "static-effect-component": StaticEffectComponent
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
