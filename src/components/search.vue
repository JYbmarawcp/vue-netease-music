<template>
  <div class="search">
    <el-input
      @click.native="onClickInput"
      placeholder="搜索"
      ref="input"
      v-model.trim="searchKeyword"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  async created () {
    
  },
  data () {
    return {
      searchPanelShow: false,
      searchKeyword: "",
      
    }
  },
  methods: {
    onClickInput() {

    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 150px;

}
</style>