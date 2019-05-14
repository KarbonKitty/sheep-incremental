<template lang="pug">
  .sitesTable
    h4 Population
    div.
      Workers (employed / all): {{ population.workers }} / {{ population.housing }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";
import { ISite } from '../classes/baseClasses';

export default baseComponent.extend({ });
</script>
