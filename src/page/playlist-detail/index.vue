<template>
  <div class="playlist-detail" v-if="playlist.id">
    <DetailHeader :playlist="playlist" />
    <div class="tabs-wrap">
      <Tabs />
      <el-input
        class="input"
        placeholder="搜索歌单音乐"
        v-model="searchValue"
      ></el-input>
    </div>
    <div class="comments">
      <Comments :id="id" />
    </div>
  </div>
</template>

<script>
import { getListDetail } from "@/api"
import DetailHeader from './detail-header'
import Comments from "@/components/comments"


export default {
  data () {
    return {
      playlist: {},

    }
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    }
  },
  watch: {
    id: {
      handler() {
        this.searchValue = ""
        this.init()
        
      },
      immediate: true
    }
  },
  components: {
    DetailHeader,
    Comments
  }
}
</script>

<style>

</style>