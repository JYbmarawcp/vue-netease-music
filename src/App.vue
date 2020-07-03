<template>
  <div id="app">
    <Layout />
    
  </div>
</template>

<script>
import Layout from "@/layout"
export default {
  name: 'app',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
