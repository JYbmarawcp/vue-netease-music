<template>
  <div
    class="loading"
    element-loading-background="transparent"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中"
    v-loading="loading"
    v-show="loading"
  >
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["loading"]
}
</script>

<style scoped>
.loading {
  height: 200px;
}
</style>