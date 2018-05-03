<template>
    <p>{{ resource.name }}: {{ resource.amount | decimal(resource.precision) }} <span v-if="resource.limit != null">/ {{ resource.limit | decimal(resource.precision) }}</span> <span v-if="resource.gainPerSecond != null">({{ resource.gainPerSecond | signedDecimal(resource.precision) }} / sec)</span></p>
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
