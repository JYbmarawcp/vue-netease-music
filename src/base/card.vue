<template>
  <div @click="onClick" class="horizontal-card">
    <slot name="img-wrap">
    </slot>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="desc">
        <slot name="desc">{{ desc }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 左边是图片 右边上下两行文字的卡片
 */
export default {
  name: "Card",
  props: ["img", "name", "desc"],
  methods: {
    onClick(e) {
      this.$emit("click", e)
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-card {
  display: flex;
  padding: 0 4px;
  cursor: pointer;

  &:hover {
    background: var(--light-bgcolor);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
    overflow: hidden;

    .name {
      margin-bottom: 4px;
      font-size: $font-size-medium-sm;
      @include text-ellipsis();
    }

    .desc {
      font-size: $font-size-sm;
      color: var(--font-color-gery-shallow);
      @include text-ellipsis();
    }
  }
}
</style>