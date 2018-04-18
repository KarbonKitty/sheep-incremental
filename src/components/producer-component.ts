import Vue from "vue";

import { IProducer } from "../classes/buyableObject";

import filters from "../filters";

export default Vue.extend({
  template: `<div v-if="producer.visible">
    <h3>{{ producer.name }}</h3>
    <p>{{ producer.desc }}</p>
    <p>You have: {{ producer.quantity }} of {{ producer.name }}</p>
    <button class="btn" @click="emitBuyEvent">{{ producer.buyVerb }}</button>
  </div>`,
  methods: {
    emitBuyEvent: function() {
      this.$parent.$emit('game-event', { type: 'buy', value: this.producer.id});
    }
  },
  props: [ 'producer' ],
  filters
});
