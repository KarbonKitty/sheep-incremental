<template lang="pug">
  div
    p
      slot
    ul
      div(v-for="rewardItem in reward")
        li(is="reward-item-component" :rewardItem="rewardItem") {{ rewardItem.chance | percentage }} chance to get:
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import RewardItemComponent from "./RewardItem.vue";

import { IRewardItem } from "../classes/Project";

export default baseComponent.extend({
  props: {
    reward: Array as () => IRewardItem[]
  },
  components: {
    'reward-item-component': RewardItemComponent
  }
});
</script>
