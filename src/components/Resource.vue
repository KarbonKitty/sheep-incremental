<template>
    <div>{{ resource.name }}: {{ resource.amount | decimal(resource.precision) }} <span v-if="resource.limit != null">/ {{ resource.limit | decimal(resource.precision) }}</span> <span v-if="resource.gainPerSecond != null">(+{{ resource.gainPerSecond | decimal(resource.precision) }})</span></div>
</template>

<script lang="ts">
import Vue from "vue";

import filters from "../filters";

export default Vue.extend({
  props: [ 'resource' ],
  filters
});
</script>
