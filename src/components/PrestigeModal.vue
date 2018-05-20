<template>
  <div class="backdrop" v-if="visible">
    <div class="modal">
      <div class="header">
        <h1>You have {{ points }} Advancement Points</h1>
      </div>
      <div class="body">
        <table>
          <thead>
            <th>Name</th>
            <th>Cost</th>
            <th>Buy</th>
          </thead>
          <tbody>
            <tr v-for="advancement in advancements" :key="advancement.id" :title="advancement.desc">
              <td class="name"><strong>{{ advancement.name }}</strong></td>
              <td class="cost">{{ advancement.rawCost.advancement }}</td>
              <td><button class="btn" @click="buyAdvancement(advancement.id)" :disabled="advancement.rawCost.advancement > points">{{ advancement.buyVerb }}</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer">
        <button class="btn" @click="finishPrestige">Done</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EventBus from '../eventBus';

export default Vue.extend({
  props: [ 'visible', 'advancements', 'points' ],
  methods: {
    buyAdvancement: function(id: string) {
      EventBus.$emit('game-event', { type: 'buy', value: id });
    },
    finishPrestige: function() {
      EventBus.$emit('game-event', { type: 'prestige', value: 'end' });
    }
  }
});
</script>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    position: fixed;
    padding: 5%;
    top: 5%;
    margin: 0 5%;
    height: 80%;
    left: 0;
    right: 0;
    z-index: 11;
    background-color: #002b36;
    border-radius: 0.5rem;
  }

  .header {
    position: absolute;
    top: 0;
    height: 10%;
  }

  .body {
    position: absolute;
    top: 10%;
    height: 80%;
    width: 100%;
  }

  .footer {
    position: absolute;
    bottom: 0;
    height: 10%;
  }

  tr:nth-child(odd) {
    background-color: #073642;
  }

  table {
    width: 80%;
  }

  td > .btn {
    width: 100%;
  }

  .name {
    padding: 0 1rem;
  }

  .cost {
    text-align: center;
  }
</style>
