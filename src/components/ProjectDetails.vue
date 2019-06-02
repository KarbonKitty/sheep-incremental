<template lang="pug">
  div
    h2 {{ project.name }}
    p {{ project.desc }}
    p Length: #[strong {{ project.template.length | timeLeft }}]
    price-component(:values="project.currentPrice") Price:
    reward-details-component(:reward="project.template.reward") Rewards:
    button.btn.buyButton(@click="emitBuyEvent" :disabled="!canBeBought") {{ project.buyVerb }}

</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { Project } from '../classes/Project';
import typeGuards from "../classes/typeGuards";

import PriceComponent from "./Price.vue";
import RewardDetailsComponent from "./RewardDetails.vue";
import { canBeBought } from '../classes/helpers';

export default baseComponent.extend({
  props: {
    project: Object as () => Project
  },
  components: {
    'price-component': PriceComponent,
    'reward-details-component': RewardDetailsComponent
  },
  methods: {
    emitBuyEvent: function() {
      this.$engineEvents.buyItem(this.project.id);
    }
  },
  computed: {
    canBeBought: function(): boolean {
      return canBeBought(this.project, this.resources);
    }
  }
});
</script>

<style scoped lang="stylus">
  .disableButton
    float right
</style>
