<template>
  <div class="playlist-detail" v-if="playlist.id">
    <DetailHeader ref="header" :playlist="playlist" />
    <div class="tabs-wrap">
      <Tabs :tabs="tabs" type="theme" v-model="activeTab" />
      <el-input
        @focus="onInputFocus"
        @blur="onInputBlur"
        :class="getInputCls()"
        class="input"
        prefix-icon="el-icon-search"
        placeholder="搜索歌单音乐"
        v-model="searchValue"
        v-show="SONG_IDX === activeTab"
      ></el-input>
    </div>

    <Song-table 
      :highlight="searchValue"
      :songs="filteredSongs"
      class="table"
      v-show="SONG_IDX === activeTab"
    />

    <Empty class="empty" v-if="searchValue && !filteredSongs.length">
      未能找到和
      <span>“{{ searchValue }}”</span>
      相关的任何音乐
    </Empty>
    <div class="comments" v-show=" COMMENT_IDX === activeTab">
      <Comments :id="id" @update="onCommentsUpdate" type="playlist" />
    </div>
  </div>
</template>

<script>
import { getListDetail } from "@/api"
import { getSongDetail } from "@/api"
import { createSong, scrollInto } from "@/utils"
import DetailHeader from './detail-header'
import Comments from "@/components/comments"
import SongTable from "@/components/song-table"

const MAX = 500
const SONG_IDX = 0
const COMMENT_IDX = 1
export default {
  async created () {
    this.SONG_IDX = SONG_IDX
    this.COMMENT_IDX = COMMENT_IDX
  },
  data () {
    return {
      tabs: ["歌曲列表", "评论"],
      activeTab: SONG_IDX,
      searchValue: "",
      inputFocus: false,
      playlist: {},
      songs: [],
    }
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
      this.genSonglist(playlist)
    },
    async genSonglist(playlist) {
      const trackIds = playlist.trackIds.map(({id}) => id)
      const songDetail = await getSongDetail(trackIds.slice(0, MAX))
      const songs = songDetail.songs.map(({ id, name, mv, ar, al, dt }) => 
        createSong({
          id,
          name,
          artists: ar,
          mvId: mv,
          albumName: al.name,
          img: al.picUrl,
          duration: dt
        })
      )
      this.songs = songs
    },
    onCommentsUpdate({ total }) {
      this.tabs.splice(COMMENT_IDX, 1, `评论(${total})`)
    },
    onInputFocus() {
      this.inputFocus = true
    },
    onInputBlur() {
      this.inputFocus = false
    },
    getInputCls() {
      return !this.inputFocus ? "inactive" : ""
    },
    scrollToHeader() {
      const { header } = this.$refs
      if (header) {
        scrollInto(header.$el)
      }
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    },
    filteredSongs() {
      return this.songs.filter(({ name, artistsText, albumName}) =>
        `${name}${artistsText}${albumName}`
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      )
    },
  },
  watch: {
    id: {
      handler() {
        this.searchValue = ""
        this.init()
        this.scrollToHeader()
      },
      immediate: true
    },
  },
  components: {
    DetailHeader,
    Comments,
    SongTable
  }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;

  .tabs-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 24px;
    border-bottom: 1px solid var(--border);

    .input {
      width: 125px;

      &:not(:hover) {
        &.inactive {
          /deep/.el-input__inner {
            background: transparent !important;
          }
        }
      }
    }
  }

  .empty {
    @include flex-center;
    height: 200px;

    span {
      color: $blue;
    }
  }

  .comments {
    padding: 16px 32px;
  }
}
</style>