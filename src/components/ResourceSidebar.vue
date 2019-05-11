<template lang="pug">
  .resourceTable
    div(v-for="res in $resources" v-if="res.locks.length === 0")
      resource-values-component(:resource="res")
</template>

<script lang="ts">
import Vue from 'vue';

import ResourceValuesComponent from "./ResourceValues.vue";

export default Vue.extend({
    components: {
        "resource-values-component": ResourceValuesComponent
    }
});
</script>

<style lang="stylus" scoped>

</style>
