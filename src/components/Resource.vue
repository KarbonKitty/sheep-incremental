<template lang="pug">
  p(v-if="resource.locks.length === 0").
    {{ resourceName | capitalize }}: {{ resource.amount | decimal(resource.template.precision) }} #[span(v-if="resource.limit != null") / {{ resource.limit | decimal(resource.template.precision) }}] #[span(:class="{ negative: gps() < 0 }") ({{ gps() | signedDecimal(resource.template.precision) }} / sec)] #[span(v-if="resource.limit * 0.95 <= resource.amount").storageWarning ⚠]
</template>

<script lang="ts">
import Vue from "vue";

import { IResource } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    resource: Object as () => IResource
  },
  computed: {
    resourceName: function() {
      return this.resource.template.name;
    }
  },
  methods: {
    gps: function() {
      return this.resource.gainPerSecond.reduce((acc, val) => (acc += val), 0) / this.resource.gainPerSecond.length;
    }
  },
  filters
});
</script>

<style scoped>
.negative {
  color: #dc322f;
}

.storageWarning {
  color: #cb4b16;
}
</style>

