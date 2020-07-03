<template>
  <div class="theme">
    <el-popover
      placement="top"
      width="230"
      trigger="click"
    >
      <div class="themes">

      </div>
      <Icon 
        :backdrop="true"
        slot="reference"
        type="skin"
      />
    </el-popover>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },

}
</script>

<style lang="scss" scoped>
.theme {
  @include flex-center();

  // .theme-item {
  //   @include flex-center();
  //   flex-direction: column;
  // }
}
</style>