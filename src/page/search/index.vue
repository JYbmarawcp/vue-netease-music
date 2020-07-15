<template>
  <div class="search-detail">
    <div
      class="header"
      ref="header"
    >
      <span class="keywords">{{ keywords }}</span>
      <span class="found">找到{{count}}个结果</span>
    </div>

    <div class="tabs-wrap">
      <Tabs 
        :tabs="tabs"
      />
    </div>

    <Empty class="empty" v-if="true">
    </Empty>
    <router-view></router-view>
  </div>
</template>

<script>
const tabs = [
  {
    title: "歌曲",
    key: "songs",
    to: "songs"
  },
  {
    title: "歌单",
    key: "playlists",
    to: "playlists"
  },
  {
    title: "MV",
    key: "mvs",
    to: "mvs"
  },
]
export default {
  props: ["keywords"],
  provide() {
    return {
      searchRoot: this
    }
  },
  created () {
    this.tabs = tabs
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    onUpdateCount(count) {
      this.count = count
    }
  },
}
</script>

<style>

</style>