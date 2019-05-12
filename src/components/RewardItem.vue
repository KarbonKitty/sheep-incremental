<template lang="pug">
  div
    li
      slot
      ul
        div(v-for="thing in rewardItem.item")
          li(v-if="typeof thing === 'string'") {{ getGameObjectName(thing) }}
          div(v-else)
            div(v-for="(amount, currency) in thing" v-if="resources[currency].locks.length === 0")
              li {{ amount | decimal(resources[currency].template.precision) }} {{ currency }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { IRewardItem } from '../classes/Expedition';
import { getGameObjectNameById } from "../classes/helpers";

export default baseComponent.extend({
  props: {
    rewardItem: Object as () => IRewardItem
  },
  methods: {
    getGameObjectName: function(id: string) {
      return getGameObjectNameById(id);
    }
  }
});
</script>
