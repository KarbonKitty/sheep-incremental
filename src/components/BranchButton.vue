<template lang="pug">
  .tab.available(@click="changeSelection" :class="{active: active}").
    {{ name | capitalize }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";
import { IndustryBranch } from '../classes/core';

export default baseComponent.extend({
  methods: {
    changeSelection: function() {
      this.$engineEvents.changeBranchSelection(this.name);
    }
  },
  props: {
    name: String as () => IndustryBranch,
    active: Boolean
  }
});
</script>

<style scoped lang="stylus">
  .active
    border-color $green
    color $green
</style>
