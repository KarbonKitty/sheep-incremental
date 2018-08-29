<template lang="pug">
  div
    p
      slot
    ul
      div(v-for="rewardItem in reward")
        li(is="reward-item-component" :rewardItem="rewardItem" :resources="resources") {{ rewardItem.chance | percentage }} chance to get:
</template>

<script lang="ts">
import Vue from 'vue';

import RewardItemComponent from "./RewardItem.vue";

import { IRewardItem } from "../classes/Expedition";
import { IResourcesData } from '../classes/baseClasses';

import filters from "../filters";

export default Vue.extend({
  props: {
    reward: Array as () => IRewardItem[],
    resources: Object as () => IResourcesData
  },
  components: {
    'reward-item-component': RewardItemComponent
  },
  filters
});
</script>
