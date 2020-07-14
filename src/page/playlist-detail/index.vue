<template>
  <div class="playlist-detail" v-if="playlist.id">
    <DetailHeader ref="header" :playlist="playlist" />
    <div class="tabs-wrap">
      <Tabs :tabs="tabs" type="theme" v-model="activeTab" />
      <el-input
        class="input"
        placeholder="搜索歌单音乐"
        v-model="searchValue"
      ></el-input>
    </div>

    <Song-table 
      :highlight="searchValue"
      :songs="filteredSongs"
      class="table"
    />

    <empty class="empty">
      未能找到和
      <span>“{{ searchValue }}”</span>
      相关的任何音乐
    </empty>
    <div class="comments">
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
      const songDetail = await getSongDetail(trackIds)
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
    onCommentsUpdate() {
      
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