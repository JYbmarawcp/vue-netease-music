<template>
  <Toggle
    :reserveDoms="reserveDoms"
    :show="isPlaylistShow"
    @update:show="setPlaylistShow(false)"
  >
    <div
      class="playlist"
      ref="playlist"
      v-show="isPlaylistShow"
    >
      <Tabs
        :tabs="tabs"
        align="center"
        v-model="activeTab"
      />
      <div class="header">
        <p>总共{{dataSource.length}}首</p>
        <div
          class="remove"
          v-if="dataSource.length"
        >
          <Icon type="remove" />
          <span class="text">清空</span>
        </div>
      </div>
    </div>
  </Toggle>
</template>

<script>
import { mapState, mapMutations } from "@/store/helper/music"

export default {
  mounted () {
    // 点击需要保留播放器的dom
    this.reserveDoms = [document.getElementById("mini-player")]
  },
  data () {
    this.tabs = ["播放列表", "历史记录"]
    this.LIST_TAB = 0
    this.HISTORY_TAB = 1

    return {
      activeTab: this.LIST_TAB,
      reserveDoms: null
    }
  },
  methods: {

    ...mapMutations(["setPlaylistShow"])
  },
  computed: {
    dataSource() {
      return this.isPlaylist ? this.playlist : this.playHistory
    },
    isPlaylist() {
      return this.activeTab === this.LIST_TAB
    },
    ...mapState([
      "isPlaylistShow",
      "playlist",
    ])
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/element-overwrite.scss";

.playlist {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  bottom: $mini-player-height;
  display: flex;
  flex-direction: column;
  background: var(--playlist-bgcolor);
  z-index: $playlist-z-index;

}
</style>