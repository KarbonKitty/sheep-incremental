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
  props: ['name', 'active'],
  filters
});
</script>

<style scoped>
  .active {
    border-color: #859900;
    color: #859900;
  }
</style>
