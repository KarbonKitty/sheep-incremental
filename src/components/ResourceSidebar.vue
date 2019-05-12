<template lang="pug">
  .resourceTable
    div(v-for="res in resources" v-if="res.locks.length === 0")
      resource-values-component(:resource="res")
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import ResourceValuesComponent from "./ResourceValues.vue";

export default baseComponent.extend({
    components: {
        "resource-values-component": ResourceValuesComponent
    }
});
</script>
