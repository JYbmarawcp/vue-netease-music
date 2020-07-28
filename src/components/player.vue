<template>
  <transition name="slide">
    <div v-if="hasCurrentSong" class="player">
      <div class="content">
        <div class="song">
          <div class="left">
            <img
              class="play-bar-support"
              src="@/assets/image/play-bar-support.png"
            />
            <img
              :class="{ playing }"
              class="play-bar"
              src="@/assets/image/play-bar.png"
            />
            <div class="img-outer-border" ref="disc">
              <div
                :class="{ paused: !playing }"
                class="img-outer"
                ref="discRotate"
              >
                <div class="img-wrap">
                  <img v-lazy="$utils.genImgUrl(currentSong.img, 400)" />
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="name-wrap">
              <p class="name">{{ currentSong.name }}</p>
              <span @click="onGoMv" class="mv-tag" v-if="currentSong.mvId"
                >MV</span
              >
            </div>
            <div class="desc">
              <div class="desc-item">
                <span class="label">歌手：</span>
                <div class="value">{{ currentSong.artistsText }}</div>
              </div>
            </div>

            <empty>还没有歌词哦~</empty>
            <Scroller :data="lyric" class="lyric-wrap" ref="scroller">
              <div>
                <div cl v-for="(l, index) in lyric" :key="index" ref="lyric">
                  <p class="lyric-text">
                    {{ l }}
                  </p>
                </div>
              </div>
            </Scroller>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <Comments
              :id="currentSong.id"
              ref="comments"
              v-if="currentSong.id"
            />
          </div>
          <div class="right">
            <Loading :loading="simiLoading" v-if="simiLoading" />
            <div v-else>
              <div class="simi-playlists">
                <p class="title">包含这首歌的歌单</p>
                <div
                  v-for="simiPlaylist in simiPlaylists"
                  :key="simiPlaylist.id"
                  class="simi-item"
                >
                  <Card
                    :img="simiPlaylist.coverImgUrl"
                    :name="simiPlaylist.name"
                    @click="onClickPlaylist(simiPlaylist.id)"
                  >
                    <template v-slot:desc>
                      <div class="desc">
                        <Icon :size="12" type="play" color="shallow" />
                        <p class="count">
                          {{ $utils.formatNumber(simiPlaylist.playCount) }}
                        </p>
                      </div>
                    </template>
                  </Card>
                </div>
              </div>

              <div class="simi-songs">
                <p class="title">相似歌曲</p>
                <div
                  class="simi-songs"
                  v-for="simiSong in simiSongs"
                  :key="simiSong.id"
                >
                  <Card
                    :img="simiSong.img"
                    :desc="simiSong.artistsText"
                    :name="simiSong.name"
                    @click="onClickSong(simiSong)"
                  >
                    <template v-slot:img-mask>
                      <PlayIcon class="play-icon" />
                    </template>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getLyric, getSimiPlaylists, getSimiSongs } from '@/api'
import lyricParser from '@/utils/lrcparse'
import { debounce, isDef, createSong } from '@/utils'
import Comments from '@/components/comments'
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from '@/store/helper/music'
export default {
  created() {},
  data() {
    return {
      lyric: [],
      tlyric: [],
      nolyric: false,
      simiLoading: false,
      simiPlaylists: [],
      simiSongs: [],
    }
  },
  methods: {
    async updateSong() {
      this.updateSimi()
    },
    async updateLyric() {
      const result = await getLyric(this.currentSong.id)
      this.nolyric = !isDef(result.lrc) || result.lrc.lyric
      if (!this.nolyric) {
        const { lyric, tlyric } = lyricParser(result)
        this.lyric = lyric
        this.tlyric = tlyric
      }
    },
    async updateSimi() {
      this.simiLoading = true
      const [simiPlaylists, simiSongs] = await Promise.all([
        getSimiPlaylists(this.currentSong.id),
        getSimiSongs(this.currentSong.id),
      ]).finally(() => {
        this.simiLoading = false
      })
      this.simiPlaylists = simiPlaylists.playlists
      this.simiSongs = simiSongs.songs.map((song) => {
        const {
          id,
          name,
          artists,
          mvid,
          album: { picUrl },
          duration,
        } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          img: picUrl,
          mvId: mvid,
        })
      })
    },
    onClickPlaylist(id) {
      // 点击的歌单和当前打开的单页是同一个 直接关闭player
      this.$router.push(`/playlist/${id}`)
    },
    onClickSong(song) {
      this.startSong(song)
      this.addToPlaylist(song)
    },
    ...mapMutations([]),
    ...mapActions(['startSong', 'addToPlaylist']),
  },
  computed: {
    ...mapState(['currentSong', 'playing']),
    ...mapGetters(['hasCurrentSong']),
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      // 如果歌曲详情显示状态切歌 需要拉去歌曲相关信息
      this.updateSong()
    },
  },
  components: {
    Comments,
  },
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

$img-left-padding: 36px;
$img-outer-border-d: 320px;
$img-outer-d: 300px;

.player {
  position: fixed;
  top: $header-height;
  bottom: $mini-player-height;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: var(--player-bgcolor);
  z-index: $song-detail-z-index;
  overflow: hidden;
  overflow-y: auto;
  transition: transform 0.5s;

  .content {
    max-width: 870px;
    margin: auto;

    .song {
      display: flex;

      .left {
        position: relative;
        padding: 80px 70px 0 $img-left-padding;
        display: flex;
        justify-content: center;

        $support-d: 30px;
        $support-d-half: $support-d / 2;
        .play-bar-support {
          position: absolute;
          left: $img-left-padding + $img-outer-border-d / 2 - $support-d / 2;
          top: -$support-d-half;
          width: $support-d;
          height: $support-d;
          z-index: 2;
        }

        .play-bar {
          $w: 100px;
          $h: 146px;
          position: absolute;
          top: 0;
          left: $img-left-padding + $img-outer-border-d / 2 -6px;
          width: $w;
          height: $h;
          z-index: 1;
          transform-origin: 0 0; // 等价于left top
          transform: rotate(-30deg);
          transition: all 0.3s;

          &.playing {
            transform: rotate(5deg);
          }
        }

        .img-outer-border {
          @include round($img-outer-border-d);
          @include flex-center;
          background: var(--song-shallow-grey-bg);

          .img-outer {
            @include round($img-outer-d);
            @include flex-center;
            background: $black;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            animation: rorate 20s linear infinite;

            &.paused {
              animation-play-state: paused;
            }

            .img-wrap {
              @include img-wrap(200px);

              img {
                border-radius: 50%;
              }
            }
          }
        }
      }

      .right {
        flex: 1;
        padding-top: 45px;
        .name-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .name {
            font-size: $font-size-title-lg;
            color: var(--font-color-white);
          }

          .mv-tag {
            display: inline-block;
            margin-left: 8px;
            padding: 2px;
            border: 1px solid currentColor;
            border-radius: 2px;
            color: $theme-color;
            cursor: pointer;
          }
        }

        .desc {
          display: flex;
          font-size: $font-size-sm;
          margin-bottom: 30px;

          .desc-item {
            display: flex;
            margin-right: 32px;

            .label {
              display: inline-block;
              margin-right: 4px;
            }

            .value {
              color: $blue;
            }
          }
        }
      }
    }

    .bottom {
      display: flex;
      margin-top: 48px;
      margin-bottom: 36px;

      .left {
        flex: 1;
      }

      .right {
        padding-left: 36px;
        width: 28%;
        overflow: hidden;

        .simi-playlists {
          margin-bottom: 36px;
        }

        .simi-songs {
          .play-icon {
            @include abs-center;
          }
        }

        .simi-item {
          margin-bottom: 6px;
        }

        .title {
          font-size: $font-size-lg;
          font-weight: $font-weight-bold;
          margin-bottom: 12px;
        }

        .desc {
          display: flex;
          align-items: center;

          .count {
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
