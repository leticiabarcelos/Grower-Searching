<template>
  <div id="app">
    <Grower></Grower>
    <Properties></Properties>
  </div>
</template>

<script>
import Grower from "./Grower.vue";
import Properties from "./Properties.vue";

export default {
  components: {
    Grower,
    Properties
  }
};
</script>
<style>
head {
  background-color: #eec591;
}
body {
  background-color: #eec591;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>