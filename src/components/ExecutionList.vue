<template lang="pug">
  div
    h4 Current project executions
    div(v-for="e in executions")
      li ({{ e.timeLeftToComplete | timeLeft }}) {{ e.plan.template.name }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

export default baseComponent.extend({

});
</script>
