<template>
  <div id="app">
    <Grower></Grower>
    <Properties></Properties>
  </div>
</template>

<script>
import Grower from "./components/grower/Grower.vue";
import Properties from "./components/properties/Properties.vue";

export default {
  components: {
    Grower,
    Properties
  }
};
</script>

<style lang="scss">
  @import './style';
</style>