<template lang="pug">
  div(v-if="Object.keys(values).length !== 0")
    p
      slot
    ul
      div(v-for="(amount, currency) in values" :key="currency")
        li(v-if="resources[currency].locks.length === 0") {{ amount | decimal(resources[currency].template.precision) }} {{ resources[currency].template.name }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";
import { Price } from "../classes/baseClasses";

export default baseComponent.extend({
  props: {
    values: Object as () => Price
  }
});
</script>
