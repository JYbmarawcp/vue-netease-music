<template>
  <div class="comments">
    <template v-if="loading">
      <Loading :loading="loading" />
    </template>
    <template v-else>
      <div class="block" v-if="shouldHotCommentShow">
        <p class="title">精彩评论</p>
        <Comment
          v-for="(comment, index) in hotComments"
          :key="comment.id"
          :comment="comment"
          :border="!$utils.isLast(index, hotComments)"
        />
      </div>
      <div class="block" v-if="shouldCommentShow">
        <p class="title" ref="commentTitle">
          最新评论
          <span class="count">({{ total }})</span>
        </p>
        <Comment
          v-for="(comment, index) in comments"
          :key="comment.id"
          :comment="comment"
          :border="!$utils.isLast(index, comments)"
        />
      </div>
      <Pagination
        :current-page.sync="currentPage"
        :page-size="PAGE_SIZE"
        :total="total"
        class="pagination"
        @current-change="onPageChange"
      />
    </template>
    <empty v-if="!shouldHotCommentShow && !shouldCommentShow"
      >还没有评论哦~</empty
    >
  </div>
</template>

<script>
import {
  getHotComment,
  getSongComment,
  getMvComment, 
  getPlaylistComment
} from '@/api'
import { getPageOffset, scrollInto } from '@/utils'
import Comment from './comment'

const SONG_TYPE = 'song'
const PLAYLIST_TYPE = "playlist"
const MV_TYPE = 'mv'

const PAGE_SIZE = 20
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      // song-type, playlist-type, mv-type 之一
      type: String,
      default: SONG_TYPE,
    },
  },
  data() {
    return {
      loading: false,
      hotComments: [],
      comments: [],
      total: 0,
      currentPage: 1,
    }
  },
  created() {
    this.PAGE_SIZE = PAGE_SIZE
  },
  methods: {
    async getComment() {
      this.loading = true
      const commentRequestMap = {
        [SONG_TYPE]: getSongComment,
        [PLAYLIST_TYPE]: getPlaylistComment,
        [MV_TYPE]: getMvComment,
      }
      const commentRequest = commentRequestMap[this.type]
      const { hotComments = [], comments = [], total } = await commentRequest({
        id: this.id,
        pageSize: PAGE_SIZE,
        offSet: getPageOffset(this.currentPage, PAGE_SIZE),
      }).finally(() => {
        this.loading = false
      })

      // 歌单的完整热评需要单独请求接口获取
      if (this.type === PLAYLIST_TYPE && this.currentPage === 1) {
        const { hotComments: exactHotComments = [] } = await getHotComment({
          id: this.id,
          type: 2 // 歌单type
        })
        this.hotComments = exactHotComments
      } else {
        this.hotComments = hotComments
      }
      this.comments = comments
      this.total = total
      this.$emit('update', { comments, hotComments, total })
    },
    async onPageChange() {
      await this.getComment()
      this.$nextTick(() => {
        scrollInto(this.$refs.commentTitle)
      })
    },
  },
  watch: {
    id: {
      handler(newId) {
        if (newId) {
          this.currentPage = 1
          this.getComment()
        }
      },
      immediate: true,
    },
  },
  computed: {
    shouldHotCommentShow() {
      return this.hotComments.length > 0 && this.currentPage === 1
    },
    shouldCommentShow() {
      return this.comments.length > 0
    },
  },
  components: {
    Comment,
  },
}
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 48px;

  .title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin-bottom: 4px;

    .count {
      font-size: $font-size;
    }
  }
}
</style>
