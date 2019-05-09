<template lang="pug">
  .backdrop(v-if="visible")
    .modal
      .header
        h1 You have {{ points }} Advancement Points
      .body
        table
          thead
            th Name
            th Cost
            th Buy
          tbody
            tr(v-for="advancement in advancements" :key="advancement.id" :title="advancement.desc")
              td.name #[strong {{ advancement.name }}]
              td.cost {{ advancement.cost.getTotal().advancement }}
              td
                button.btn(@click="buyAdvancement(advancement.id)" :disabled="advancement.cost.getTotal().advancement > points || advancement.done") {{ advancement.done ? "Done!" : advancement.buyVerb }}
      .footer
        button.btn(@click="finishPrestige") Done
</template>

<script lang="ts">
import Vue from 'vue';

import { Idea } from '../classes/Idea';

export default Vue.extend({
  props: {
    visible: Boolean,
    advancements: Array as () => Idea[],
    points: Number
  },
  methods: {
    buyAdvancement: function(id: string) {
      this.$engineEvents.buyItem(id);
    },
    finishPrestige: function() {
      this.$engineEvents.endPrestige();
    }
  }
});
</script>

<style scoped lang="stylus">
  .backdrop
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.75)
    z-index 10

  .modal
    position fixed
    padding 5%
    top 5%
    margin 0 5%
    height 80%
    left 0
    right 0
    z-index 11
    background-color $base03
    border-radius 0.5rem

  .header
    position absolute
    top 0
    height 10%

  .body
    position absolute
    top 10%
    height 80%
    width 100%

  .footer
    position absolute
    bottom 0
    height 10%

  tr:nth-child(odd)
    background-color $base02

  table
    width 80%

  td > .btn
    width 100%

  .name
    padding 0 1rem

  .cost
    text-align center
</style>
