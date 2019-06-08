<template lang="pug">
  div
    p {{ objectName | capitalize }} {{ "reward" }}:
    ul
      li(v-for="item in effect.scale")
        p {{ itemChance(item) | percentage }} chance to get:
        ul
          li(v-for="(amount, currency) in item.resources" :key="currency")
            span {{ currency }}: {{ amount | signed }}
          li(v-for="(amount, siteType) in item.sites" :key="siteType")
            span {{ siteType }}: {{ amount | signed }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { RewardUpgradeEffect } from "../classes/baseClasses";
import { IRewardItem, rewardChanceType } from '@/classes/Project';

export default baseComponent.extend({
    props: {
      effect: Object as () => RewardUpgradeEffect
    },
    methods: {
        itemChance: function(item: IRewardItem) {
            return rewardChanceType[item.type];
        }
    },
    computed: {
        objectName: function(): string {
        // TODO: error handling
        return this.gameObjects.filter(o => o.id === this.effect.affectedObjectId)[0].name;
    }
  }
});
</script>
