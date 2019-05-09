<template lang="pug">
  div
    p
      slot
    ul
      div(v-for="(amount, currency) in values" :key="currency")
        li(is="price-item-component" :amount="amount" :currency="currency")
</template>

<script lang="ts">
import Vue from 'vue';

import PriceItemComponent from "./PriceItem.vue";

import { Price } from "../classes/baseClasses";

export default Vue.extend({
  props: {
    values: Object as () => Price
  },
  components: {
    'price-item-component': PriceItemComponent
  }
});
</script>
