<template>
  <div v-if="gameObject.locks.length === 0 && !gameObject.done" class="gameObject" @click="changeSelection">
    <p><strong>{{ gameObject.name }} <span v-if="typeof gameObject.quantity === 'number'">({{ gameObject.quantity }})</span></strong></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IGameObject from "../classes/IGameObject";

export default Vue.extend({
  methods: {
    changeSelection: function() {
      this.$parent.$emit('game-event', { type: 'change-selection', value: this.gameObject.id });
    }
  },
  props: {
    gameObject: Object as () => IGameObject
  }
});
</script>

<style scoped>
  .gameObject {
    text-align: center;
    padding: 0 0.25rem;
    margin: 0.125rem 0;
    border: 1px solid #839496;
    border-radius: 4px;
    width: 200px;
    cursor: pointer;
  }

  .gameObject > p {
    margin: 0.5rem 0;
  }
</style>
