<template lang="pug">
  div.resourceLine
    .name {{ name | capitalize }}
    .gps #[span(:class="{ negative: gps() < 0 }") {{ gps() | decimal(precision) }} / s]
    .storage #[span {{ resource.amount | decimal(precision) }} #[span(v-if="resource.limit != null") / {{ resource.limit | decimal(precision) }}]]
    .storageWarning #[span(:class="warning") ⚠]
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import { IResource } from "../classes/core";

export default baseComponent.extend({
  props: {
    resource: Object as () => IResource
  },
  computed: {
    name: function() {
      return this.resource.template.name;
    },
    precision: function() {
      return this.resource.template.precision;
    },
    warning: function() {
      if (this.resource.limit === this.resource.amount) {
        return { noMoreStorage: true };
      } else if ((this.resource.limit || 0) * 0.95 <= this.resource.amount) {
        return { seriousWarning: true };
      } else if ((this.resource.limit || 0) * 0.9 <= this.resource.amount) {
        return { mildWarning: true };
      } else {
        return { noWarning: true };
      }
    }
  },
  methods: {
    gps: function() {
      return this.resource.gainPerSecond.reduce((acc, val) => (acc += val), 0) / this.resource.gainPerSecond.length;
    }
  }
});
</script>

<style scoped lang="stylus">
.negative
  color $red

.mildWarning
  color $yellow

.seriousWarning
  color $orange

.noMoreStorage
  color $red

.noWarning
  display none

.resourceLine
  display grid
  grid-template-columns 40% 20% 35% 5%
  grid-template-rows 100%

.name
  grid-column 1
  grid-row 1

.gps
  grid-column 2
  grid-row 1

.storage
  grid-column 3
  grid-row 1
  display flex
  justify-content flex-end

.storageWarning
  grid-column 4
  grid-row 1
  display flex
  justify-content flex-end
</style>
