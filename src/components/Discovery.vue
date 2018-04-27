<template>
  <div v-if="discovery.locks.length === 0 && !discovery.done" class="discovery" @click="changeSelection">
    <p><strong>{{ discovery.name }}</strong></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IDiscovery from "../classes/IDiscovery";

export default Vue.extend({
  methods: {
    changeSelection: function() {
      this.$parent.$emit('game-event', { type: 'change-selection', value: this.discovery.id });
    }
  },
  props: {
    discovery: Object as () => IDiscovery
  }
});
</script>

<style scoped>
  .discovery {
    text-align: center;
    padding: 0 0.25rem;
    margin: 0.125rem 0;
    border: 1px solid #839496;
    border-radius: 4px;
    width: 200px;
    cursor: pointer;
  }

  .discovery > p {
    margin: 0.5rem 0;
  }
</style>
