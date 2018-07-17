<template lang="pug">
  li(:class="{ noResource: notEnough }") {{ lackingStorage ? '✗ ' : '' }} {{ resourceAmount | decimal(resourcePrecision) }} / {{ amount | decimal(resourcePrecision) }} {{ resourceName }}
</template>

<script lang="ts">
import resourceBase from "./resourceBase";

export default resourceBase.extend();
</script>
