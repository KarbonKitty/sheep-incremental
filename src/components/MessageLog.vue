<template lang="pug">
  div
    h4 Message Log
    div(v-for="msg in messages")
      div {{ msg }}
</template>

<script lang="ts">
import Vue from "vue";

import EventBus from "../eventBus";

export default Vue.extend({
  data: function() {
    return {
      messages: ['', '', '', '', '', '', '', '', '', '']
    };
  },
  created: function() {
    EventBus.$on("show-message", (data: string) => {
      this.addMessage(data);
    });
  },
  methods: {
    addMessage: function(message: string) {
      this.messages.unshift(message);
      this.messages.pop();
    }
  }
});
</script>