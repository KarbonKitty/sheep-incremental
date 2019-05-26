<template lang="pug">
  div
    h4 Current expeditions
    div(v-for="e in expeditions")
      li {{ e.plan.template.name }} {{ e.timeLeftToComplete | timeLeft }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

export default baseComponent.extend({

});
</script>
