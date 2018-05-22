<template lang="pug">
  transition(name="inOut")
    .toast(v-show="visible")
      p {{ msg }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: function() {
    return { visible: false }
  },
  props: [ 'lastActivationTime', 'msg' ],
  watch: {
    'lastActivationTime': function() {
      this.visible = true;
      const hide = () => this.visible = false;
      setTimeout(hide, 3000);
    }
  }
})
</script>

<style scoped>
  .toast {
    position: fixed;
    right: 4rem;
    top: 4rem;
    background-color: #383838;
    color: #F0F0F0;
    font-size: 20px;
    text-align: center;
    border-radius: 2px;
    -webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
    -moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
    box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
  }
  .toast > p {
    padding: 1rem 3rem;
  }
  .inOut-enter-active, .inOut-leave-active {
    transition: opacity .5s;
  }
  .inOut-enter, .inOut-leave-to {
    opacity: 0;
  }
</style>
