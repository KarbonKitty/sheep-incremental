<template lang="pug">
  div
    li
      slot
      ul
        div(v-if="typeof rewardItem.resources !== 'undefined'")
          div(v-for="(amount, currency) in rewardItem.resources" v-if="resources[currency].locks.length === 0")
            li {{ amount | decimal(resources[currency].template.precision) }} {{ currency }}
        div(v-if="typeof rewardItem.sites !== 'undefined'")
          div(v-for="(amount, siteType) in rewardItem.sites" v-if="sites[siteType].locks.length === 0")
            li {{ amount | decimal(0) }} {{ siteType }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { IRewardItem } from '../classes/Expedition';
import { getGameObjectNameById } from "../classes/helpers";

export default baseComponent.extend({
  props: {
    rewardItem: Object as () => IRewardItem
  }
});
</script>
