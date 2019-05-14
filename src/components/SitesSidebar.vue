<template lang="pug">
  .sitesTable
    h4 Sites
    div(v-for="site in sites" v-if="site.locks.length === 0").
      {{ site.template.name | capitalize }}: {{ site.amountUsed }} / {{ site.totalAmount }}
</template>

<script lang="ts">
import baseComponent from "./baseComponent";
import { ISite } from '../classes/baseClasses';

export default baseComponent.extend({
    props: {
        site: Object as () => ISite
    }
});
</script>
