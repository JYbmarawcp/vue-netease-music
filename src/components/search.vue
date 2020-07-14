<template>
  <div class="search">
    <el-input
      @click.native="onClickInput"
      @keypress.native.enter="onEnterPress"
      placeholder="搜索"
      prefix-icon="el-icon-search"
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
      this.searchPanelShow = true
    },
    
    onEnterPress() {
      if (this.searchKeyword) {
        this.goSearch(this.searchKeyword)
      }
    },
    goSearch(keywords) {
      this.$router.push(`/search/${keywords}`)
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