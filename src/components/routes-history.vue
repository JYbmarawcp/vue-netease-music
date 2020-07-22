<template>
  <div class="routes-history">
    <Icon 
      class="icon"
      :backdrop="true"
      type="back"
      @click="back"
    />
    <Icon
      class="icon"
      :backdrop="true"
      type="forward"
      @click="forward"
    />
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back()
    },
    forward() {
      this.$router.forward()
    }
  }
}
</script>

<style lang="scss" scoped>
.routes-history {
  display: flex;
  align-items: center;

  .icon {
    margin-right: 16px;
  }
}
</style>