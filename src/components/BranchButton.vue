<template lang="pug">
  .selectButton.available(@click="changeSelection" :class="{active: active}")
    p.
      {{ name | capitalize }}
</template>

<script lang="ts">
import Vue from 'vue';
import EventBus from '../eventBus';
import filters from '../filters';

export default Vue.extend({
  methods: {
    changeSelection: function() {
      EventBus.$emit('game-event', { type: 'change-branch', value: this.name });
    }
  },
  props: {
    name: String,
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
