<template>
  <div class="mv">
    <div class="mv-content">
      <div class="left">
        <p class="title">MV详情</p>

        <div class="player">
          <VideoPlayer :url="mvPlayInfo.url" ref="video" />
        </div>
        
        <div class="author-wrap">
          <div class="avatar">
            <img v-lazy="$utils.genImgUrl(artist.picUrl, 120)" alt="" />
          </div>
          <p class="author">{{ artist.name }}</p>
        </div>

        <p class="name">{{ mvDetail.name }}</p>
        <div class="desc">
          <span class="date"
            >发布：{{
              $utils.formatDate(mvDetail.publishTime, 'yyyy-MM-dd')
            }}</span
          >
          <span class="count">播放： {{ mvDetail.playCount }}次</span>
        </div>

        <div class="comments">
          <Comments :id="id" type="mv"/>
        </div>
      </div>

      <div class="right">
        <p class="title">相关推荐</p>
        <div class="simi-mvs">
          <Card
            v-for="simiMv in simiMvs"
            :key="simiMv.id"
            :name="simiMv.name"
            :desc="`by ${simiMv.artistName}`"
            class="simi-mv-card"
            @click="goMv(simiMv.id)"
          >
            <template #img-wrap>
              <MvCard
                :duration="simiMv.duration"
                :img="simiMv.cover"
                :playCount="simiMv.playCount"
              />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvDetail, getMvUrl, getSimiMv, getArtists } from '@/api'
import { hideMenuMixin } from "@/utils"
import Comments from '@/components/comments'
import MvCard from '@/components/mv-card'
import { mapMutations } from "@/store/helper/music"

export default {
  mixins: [hideMenuMixin],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  
  data() {
    return {
      mvDetail: {},
      mvPlayInfo: '',
      simiMvs: [],
      artist: {},
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const [
        { data: mvDetail },
        { data: mvPlayInfo },
        { mvs: simiMvs },
      ] = await Promise.all([
        getMvDetail(this.id),
        getMvUrl(this.id),
        getSimiMv(this.id),
      ])
      const { artist } = await getArtists(mvDetail.artistId)

      this.mvDetail = mvDetail
      this.mvPlayInfo = mvPlayInfo
      this.simiMvs = simiMvs
      this.artist = artist

      this.$nextTick(() => {
        const player = this.$ref.video.player
        // 加载高清源
        // player.emit("resourceReady", )
        player.on("play", () => {
          // 停止播放歌曲
          this.setPlayingState(false)
        })
      })
    },
    goMv(id) {
      this.$router.push(`/mv/${id}`)
    },
    ...mapMutations(["setPlayingState"])
  },
  components: {
    MvCard,
    Comments,
  },
  watch: {
    id: "init"
  }
}
</script>

<style lang="scss" scoped>
.mv {
  padding: $page-padding;

  .title {
    margin-bottom: 16px;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }

  .mv-content {
    display: flex;
    max-width: 950px;
    margin: auto;

    .left {
      flex: 1;

      .player {
        margin-bottom: 16px;
        overflow: hidden;
        border-radius: 4px;
      }

      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        .avatar {
          @include img-wrap(60px);
          margin-right: 8px;
          img {
            @include round(60px);
          }
        }

        .author {
          font-size: $font-size-lg;
        }
      }

      .name {
        margin-bottom: 16px;
        font-size: $font-size-title-lg;
        font-weight: $font-weight-bold;
      }

      .desc {
        display: flex;
        color: var(--font-color-gery-shallow);
        font-size: $font-size-sm;

        .date {
          display: inline-block;
          margin-right: 24px;
        }
      }

      .comments {
        margin-top: 48px;
      }
    }

    .right {
      width: 36%;
      padding-left: 32px;

      .simi-mvs {
        padding: -8px 0;

        .simi-mv-card {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
