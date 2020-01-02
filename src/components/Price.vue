<template lang="pug">
  div
    p
      slot
    ul
      div(v-for="(amount, currency) in values" :key="currency")
        li(is="price-item-component" :amount="amount" :currency="currency")
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import PriceItemComponent from "./PriceItem.vue";

import { Price } from "../classes/core";

export default baseComponent.extend({
  props: {
    values: Object as () => Price
  },
  components: {
    'price-item-component': PriceItemComponent
  }
});
</script>
