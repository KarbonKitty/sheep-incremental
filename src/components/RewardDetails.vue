<template lang="pug">
  div
    p
      slot
    ul
      div(v-for="rewardItem in reward")
        li(is="reward-item-component" :rewardItem="rewardItem") {{ itemChance(rewardItem) | percentage }} chance to get:
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import RewardItemComponent from "./RewardItem.vue";

import { IRewardItem, rewardChanceType } from "../classes/Project";

export default baseComponent.extend({
  props: {
    reward: Array as () => IRewardItem[]
  },
  methods: {
    itemChance: function(item: IRewardItem) {
      return rewardChanceType[item.type];
    }
  },
  components: {
    'reward-item-component': RewardItemComponent
  }
});
</script>
