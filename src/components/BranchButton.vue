<template lang="pug">
  .selectButton.available(@click="changeSelection" :class="{active: active}")
    p.
      {{ name | capitalize }}
</template>

<script lang="ts">
import Vue from 'vue';
import { IndustryBranch } from '../classes/baseClasses';
import filters from '../filters';

export default Vue.extend({
  methods: {
    changeSelection: function() {
      this.$engineEvents.changeBranchSelection(this.name);
    }
  },
  props: {
    name: String as () => IndustryBranch,
    active: Boolean
  },
  filters
});
</script>

<style scoped lang="stylus">
  .active
    border-color $green
    color $green
</style>
