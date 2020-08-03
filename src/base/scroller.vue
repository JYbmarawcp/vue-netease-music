<template>
  <div class="scroller" ref="scroller">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import mouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(ScrollBar)
BScroll.use(mouseWheel)

const defaultOptions = {
  mouseWheel: true,
  scrollY: true,
  scrollBar: true,
  probeType: 3,
}
export default {
  name: 'Scroller',
  props: {
    data: {
      default: () => [],
    },
  },
  data() {
    return {}
  },
  methods: {
    getScroller() {
      return this.scroller
    },
    refresh() {
      this.scroller.refresh()
    }
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if (!this.scroller) {
            this.scroller = new BScroll(this.$refs.scroller, defaultOptions)
            this.$emit('init', this.scroller)
          } else {
            this.scroller && this.scroller.refresh()
          }
        })
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.scroller {
  position: relative;
  overflow: hidden;
  height: 100%;
}
</style>
