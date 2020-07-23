<template>
  <transition name="slide">
    <div
      v-if="hasCurrentSong"
      class="player"
    >
      <div class="content">
        <div class="song">

        </div>
        <div class="bottom">
          <div class="left">
            <Comments
              :id="currentSong.id"
              ref="comments"
              v-if="currentSong.id"
            />
          </div>
          <div 
            class="right"
          >
            <Loading
              :loading="simiLoading"
              v-if="simiLoading"
            />
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
                        <p class="count">{{$utils.formatNumber(simiPlaylist.playCount)}}</p>
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
import { getSimiPlaylists, getSimiSongs } from "@/api"
import { createSong } from "@/utils"
import Comments from "@/components/comments"
import { mapState, mapMutations, mapActions, mapGetters } from "@/store/helper/music"
export default {
  created () {
    
  },
  data () {
    return {
      simiLoading: false,
      simiPlaylists: [],
      simiSongs: [],
    }
  },
  methods: {
    async updateSong() {
      this.updateSimi()
    },
    async updateSimi() {
      this.simiLoading = true
      const [simiPlaylists, simiSongs] = await Promise.all([
        getSimiPlaylists(this.currentSong.id),
        getSimiSongs(this.currentSong.id)
      ]).finally(() => {
        this.simiLoading = false
      })
      this.simiPlaylists = simiPlaylists.playlists
      this.simiSongs = simiSongs.songs.map(song => {
        const {
          id,
          name,
          artists,
          mvid,
          album: { picUrl },
          duration
        } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          img: picUrl,
          mvId: mvid
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
    ...mapActions(["startSong", "addToPlaylist"])
  },
  computed: {
    ...mapState(["currentSong"]),
    ...mapGetters(["hasCurrentSong"])
  },
  watch: {
    currentSong(newSong, oldSong) {
      
      if (newSong.id === oldSong.id) {
        return
      }
      // 如果歌曲详情显示状态切歌 需要拉去歌曲相关信息
      this.updateSong()
    }
  },
  components: {
    Comments
  }
}
</script>

<style lang="scss" scoped>

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