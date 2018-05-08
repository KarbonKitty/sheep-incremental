<template>
    <p>{{ resource.name | capitalize }}: {{ resource.amount | decimal(resource.precision) }} <span v-if="resource.limit != null">/ {{ resource.limit | decimal(resource.precision) }}</span> <span :class="{ warning: resource.gainPerSecond < 0 }">({{ resource.gainPerSecond | signedDecimal(resource.precision) }} / sec)</span></p>
</template>

<script lang="ts">
import Vue from "vue";

import { IResource } from "../classes/baseClasses";

import filters from "../filters";

export default Vue.extend({
  props: {
    resource: Object as () => IResource
  },
  filters
});
</script>

<style scoped>
  .warning {
    color: #dc322f;
  }
</style>

