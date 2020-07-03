<template>
  <div class="header">
    <div class="left">

    </div>
    <div class="right">
      <div class="search-wrap">
        <Search />
      </div>
      <Theme />
    </div>
  </div>
</template>

<script>
import Search from "@/components/search"
import Theme from "@/components/theme"
export default {
  methods: {
    
  },
  components: {
    Search,
    Theme
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/element-overwrite.scss";

.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;

  @include el-input-theme(
    var(--header-input-color),
    var(--header-input-bgcolor),
    var(--header-input-placeholder-color)
  );

  /deep/.iconfont {
    color: var(--header-font-color);
  }

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    .font-weight {
      white-space: nowrap;
    }

    
  }

  .right {
    display: flex;
    align-items: center;

    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>