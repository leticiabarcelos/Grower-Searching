<template>
  <div id="app">
    <Grower></Grower>
    <Properties></Properties>
  </div>
</template>

<script>
  import Grower from './Grower.vue'
  import Properties from './Properties.vue'

  export default {
    components: {
      Grower,
      Properties
    }
  }
</script>
<style>
  body {
    margin-top: 0px;
    margin-bottom: 0px
  }
</style>