<template>
  <ul
    :class="{[align]: true}"
    class="tab-wrap"
  >
    <template v-if="isRouteMode">
      <router-link
        :active-class="`${ROUTE_ACTIVE_CLS} ${activeItemClass}`"
        v-for="(tab, index) in normalizedTabs"
        :key="tab"
        :style="getItemStyle(tab, index)"
        :to="tab.to"
        tag="li"
        ref="routerLinks"
        class="tab-item"
      >
        <span class="title">{{tab.title}}</span>
      </router-link>
    </template>
    <template>
      <li
        v-for="(tab, index) in normalizedTabs"
        :key="tab"
        :class="getItemCls(tab, index)"
        :style="getItemStyle(tab, index)"
        @click="onChangeTab(tab, index)"
        class="tab-item"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
// import { isDef } from "@/utils"

const ACTIVE_PROP = "active"
const ACTIVE_CHANGE = "tabChange"
const ROUTE_ACTIVE_CLS = "active"

export default {
  name: "Tabs",
  props: {
    [ACTIVE_PROP]: {
      type: Number,
      default: 0
    },
    tabs: {
      type: Array,
      default: () => []
    },
    
    itemClass: {
      type: String
    },
    itemStyle: {
      type: Object,
      default: () => {}
    },

    // 不传的话对应大号字体 高亮加粗
    // small对应小号字体 高亮红色
    // split对应小号字体 分割线分隔 高亮背景色变灰文字变红
    type: {
      type: String
    }
  },
  model: {
    prop: ACTIVE_PROP,
    event: ACTIVE_CHANGE
  },
  created () {
    this.ROUTE_ACTIVE_CLS = ROUTE_ACTIVE_CLS
  },
  methods: {
    onChangeTab(tab, index) {
      this.$emit(ACTIVE_PROP, index)
    },
    isActive(tab, index) {
      // 路由模式
    },
    getItemCls(tab, index) {
      let base = []
      if (this.itemClass) {
        base.push(this.itemClass)
      }
      if (this.type) {
        base.push(this.type)
      }
      if (this.isActive) {
        
      }
      return base.join(" ")
    },
    getItemStyle(tab, index) {

    }
  },
  computed: {
    isRouteMode() {
      return false
    },
    normalizedTabs() {
      return typeof this.tabs[0] === "string"
        ? this.tabs.map(tab => ({ title: tab }))
        : this.tabs
    }
  }
}
</script>

<style>

</style>