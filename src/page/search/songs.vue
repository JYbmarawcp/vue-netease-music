<template>
  <div class="search-songs">
    <WithPagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :limit="30"
      @getDataSuccess="onGetSearch"
    >
      <div class="table">
        <SongTable
          :highlightText="keywords"
          :songs="songs"
        />
      </div>
    </WithPagination>
  </div>
</template>

<script>
import { getSearch } from "@/api"
import { createSong } from "@/utils"
import WithPagination from "@/components/with-pagination"
import SongTable from "@/components/song-table"

export default {
  inject: ["searchRoot"],
  created () {
    this.getSearch = getSearch
  },
  data () {
    return {
      songs: [],
      currentPage: 1

    }
  },
  methods: {
    onGetSearch(result) {
      const { result: { songs, songCount }} = result
      this.songs = songs.map(song => {
        const { id, name, mvid, alias, artists, album, duration } = song
        return createSong({
          id,
          name,
          mvId: mvid,
          alias,
          artists,
          albumId: album.id,
          albumName: album.name,
          duration
        })
      })
      this.songCount = songCount
    }

  },
  computed: {
    keywords() {
      return this.searchRoot.keywords
    },
    searchParams() {
      return { keywords: this.keywords }
    }
  },
  components: {
    WithPagination,
    SongTable
  }
}
</script>

<style lang="scss" scoped>
.search-songs {
  .table {
    
  }
}
</style>