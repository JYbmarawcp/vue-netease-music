<template>
  <div class="comment">
    <template>
      <div
        class="block"
      
      >
        <p class="title">精彩评论</p>

      </div>
      <div
        class="block"
      >
        <p class="title" ref="commentTitle">
          最新评论
          <span class="count">({{123}})</span>
        </p>
        <Pagination
          :page-size="PAGE_SIZE"
          :total="total"
          class="pagination"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { getMvComment } from "@/api"
import { getPageOffset, scrollInto } from "@/utils"

const SONG_TYPE = "song"
const PLAYLIST_TYPE = "playlist"
const MV_TYPE = "mv"

const PAGE_SIZE = 20
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      // song-type, playlist-type, mv-type 之一
      type: String,
      default: SONG_TYPE
    }
  },
  data() {
    return {
      comment: [],
      total: 0,
      currentPage: 1,
    }
  },
  created() {
    this.PAGE_SIZE = PAGE_SIZE
  },
  methods: {
    getComment() {
      const commentRequestMap = {
        [SONG_TYPE]: getSongComment,
        [PLAYLIST_TYPE]: getPlaylistComment,
        [MV_TYPE]: getMvComment
      }
      const commentRequest = commentRequestMap[this.type]
      const {  }
    }
  },
  watch: {
    id: {
      handler(newId) {
        if (newId) {
          this.currentPage = 1
          this.getComment()
        }
      },
      immediate: true
    }
  },
  components: {

  }
}
</script>

<style>

</style>