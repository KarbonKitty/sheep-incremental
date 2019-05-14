<template lang="pug">
  div
    p Site required: #[strong(:class="{ lacking: lacking }") {{ requiredSite }}]
</template>

<script lang="ts">
import baseComponent from "./baseComponent";
import { SiteType } from '../classes/baseClasses';

export default baseComponent.extend({
    props: {
        requiredSite: String as () => SiteType
    },
    computed: {
        lacking: function() {
            return this.sites[this.requiredSite].totalAmount === this.sites[this.requiredSite].amountUsed;
        }
    }
});
</script>

<style scoped lang="stylus">
  .lacking
    color $red
</style>
