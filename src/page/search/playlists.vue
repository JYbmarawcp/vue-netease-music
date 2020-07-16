<template>
  <div class="search-playlists">
    <WithPagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :total="playlistCount"
      :limit="50"
      :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
      @getDataSuccess="onGetPlaylists"
    >
      <div class="list-wrap">
        <PlaylistCard
          v-for="item in playlists"
          :key="item.id"
          :desc="`播放量：${$utils.formatNumber(item.playCount)}`"
          :id="item.id"
          :img="item.coverImgUrl"
          :name="item.name"
        />
      </div>
    </WithPagination>
  </div>
</template>

<script>
import { getSearch } from "@/api"
import WithPagination from "@/components/with-pagination"
import PlaylistCard from "@/components/playlist-card"

const SEARCH_TYPE_PLAYLIST = 1000
export default {
  inject: ["searchRoot"],
  created () {
    this.getSearch = getSearch
  },
  data () {
    return {
      playlists: [],
      playlistCount: 0,
    }
  },
  methods: {
    onGetPlaylists({ result: { playlists, playlistCount } }) {
      this.playlists = playlists
      this.playlistCount = playlistCount
      this.searchRoot.onUpdateCount(playlistCount)
    }
  },
  computed: {
    searchParams() {
      return { keywords: this.searchRoot.keywords, type: SEARCH_TYPE_PLAYLIST }
    }
  },
  components: {
    WithPagination,
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.search-playlists {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;

  .list-wrap {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>