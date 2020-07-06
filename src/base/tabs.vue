<template>
  <ul
    :class="{[align]: true}"
    class="tab-wrap"
  >
    <template v-if="isRouteMode">
      <router-link
        :active-class="`${ROUTE_ACTIVE_CLS} ${activeItemClass}`"
        v-for="(tabs, index) in normalizedTabs"
        :key="tabs"
        :style="getItemStyle(tab, index)"
        :to="tab.to"
        tag="li"
        ref="routerLinks"
      >
        <span class="title">{{tab.title}}</span>
      </router-link>
    </template>
    <!-- <template>
      <li></li>
    </template> -->
  </ul>
</template>

<script>
// import { isDef } from "@/utils"

const ACTIVE_PROP = "active"
// const ACTIVE_CHANGE = "tabChange"
// const ROUTE_ACTIVE_CLS = "active"

export default {
  name: "Tabs",
  props: {
    [ACTIVE_PROP]: {
      type: Number,
      default: 0
    },

  }
}
</script>

<style>

</style>