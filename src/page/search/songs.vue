<template>
  <div class="search-songs">
    <WithPagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :limit="30"
      :total="songCount"
      @getDataSuccess="onGetSearch"
    >
      <div class="table">
        <SongTable
          :highlightText="keywords"
          :renderNameDesc="renderNameDesc"
          :songs="songs"
          :stripe="true"
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
      currentPage: 1,
      songCount: 0
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
      this.searchRoot.onUpdateCount(songCount)
    },
    renderNameDesc(scope) {
      const { alias } = scope.row
      return alias.map(desc => (
        <HighlightText
          class="name-desc"
          text={desc}
          highlightText={this.keywords}
        />
      ))
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
    .name-desc {
      display: block;
      margin-top: 8px;
      color: var(--font-color-grey-shallow);
      @include text-ellipsis;
    }
  }

  .pagination {
    margin-top: 18px;
    text-align: right;
  }
}
</style>