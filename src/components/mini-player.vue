<template>
  <div class="mini-player" id="mini-player">
    <!-- 歌曲内容 -->
    <div class="song">
      <template>
        <div class="img-wrap">
          <div class="mask"></div>
          <img v-lazy="$utils.genImgUrl(currentSong.img, 80)" class="blur" >
          <div class="player-control">
            <Icon :size="24" :type="playControlIcon" color="white" />
          </div>
        </div>
        <div class="content">
          <div class="top">
            <p class="name">{{currentSong.name}}</p>
            <p class="split">-</p>
            <p class="artists">{{currentSong.artistsText}}</p>
          </div>
          <div class="time">
            <span class="played-time">
              {{}}
            </span>
            <span class="split">/</span>
            <span class="total-time">
              {{ $utils.formatTime(currentSong.duration / 1000) }}
            </span>
          </div>
        </div>
      </template>
    </div>
    <!-- 控制台 -->
    <div class="control">
      <Icon :size="24" class="icon" type="prev" />
      <el-popover
        placement="top"
        trigger="manual"
        width="160"
      >
        <div @click="togglePlaying" slot="reference" class="play-icon">
          <Icon :size="24" :type="playIcon" />
        </div>
      </el-popover>
      <Icon :size="24" class="icon" type="next" />
    </div>

    <div class="mode">
      <Share :shareUrl="shareUrl" class="mode-item" />

      <!-- 模式 -->
      <el-popover
        placement="top"
        trigger="hover"
        width="160"
      >
        <p>{{ playModeText }}</p>
        <Icon
          :size="20"
          :type="modeIcon"
          @click="onChangePlayMode"
          class="mode-item"
          slot="reference"
        />
      </el-popover>
      <!-- 播放列表 -->
      <el-popover
      :value="isPlaylistPromptShow"
        placement="top"
        trigger="manual"
        width="160"
      >
        <p>已更新歌单</p>
        <Icon
          :size="20"
          @click="togglePlaylistShow"
          class="mode-item"
          slot="reference"
          type="playlist"
        />
      </el-popover>
      <!-- 音量 -->
      <div class="volume-item">
        <Volume :volume="volume" @volumechange="onVolumeChange" />
      </div>
      <!-- github -->
      <Icon :size="20" @click="goGitHub" class="mode-item" type="github" />
    </div>

    <div class="progress-bar-wrap">

    </div>
    <audio :src="currentSong.url" ref="audio" />
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  // mapGetters,
  // mapActions
} from "@/store/helper/music"
import Share from "@/components/share"
import storage from 'good-storage'
import { VOLUME_KEY, playModeMap } from "@/utils"

const DEFAULT_VOLUME = 0.75
export default {
  data () {
    return {
      songReady: false,
      volume: storage.get(VOLUME_KEY, DEFAULT_VOLUME)
    }
  },
  mounted () {
    
  },
  methods: {
    togglePlaying() {
      if (!this.currentSong.id) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    ready() {
      this.songReady = true
    },
    async play() {
      if (this.songReady) {
        try {
          await this.audio.play()
        } catch (error) {
          // 提示用户手动播放
          
        }
      }
    },
    pause() {
      this.audio.pause()
    },
    onChangePlayMode() {
      const modeKeys = Object.keys(playModeMap)
      const currentModeIndex = modeKeys.findIndex(
        key => playModeMap[key].code === this.playMode
      )
      const nextIndx = (currentModeIndex + 1) % modeKeys.length
      const nextModeKey = modeKeys[nextIndx]
      const nextMode = playModeMap[nextModeKey]
      this.setPlayMode(nextMode.code)
    },
    onVolumeChange(percent) {
      storage.set(VOLUME_KEY, percent)
    },
    togglePlaylistShow() {
      this.setPlaylistShow(!this.isPlaylistShow)
    },
    goGitHub() {
      window.open("https://github.com/JYbmarawcp/vue-netease-music")
    },
    ...mapMutations([
      "setCurrentTime",
      "setPlayingState",
      "setPlayMode",
      "setPlaylistShow",
    ]),

  },
  watch: {
    playing(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause()
      })
    }
  },
  computed: {
    playIcon() {
      return this.playing ? "pause" : "play"
    },
    currentMode() {
      return playModeMap[this.playMode]
    },
    modeIcon() {
      return this.currentMode.icon
    },
    playModeText() {
      return this.currentMode.name
    },
    audio() {
      return this.$refs.audio
    },
    playControlIcon() {
      return "shrink"
    },
    shareUrl() {
      return `https://music.163.com/#/song?id=${this.currentSong.id}`
    },

    
    ...mapState([
      "currentSong",
      "currentTime",
      "playing",
      "playMode",
      "isPlaylistShow",
      "isPlaylistPromptShow",
    ])
  },
  components: {
    Share
  }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  z-index: $mini-player-z-index;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  height: $mini-player-height;
  padding: 8px 16px;
  padding-right: 24px;
  background: var(--body-bgcolor);

  .song {
    display: flex;
    flex: 4;
    overflow: hidden;

    .img-wrap {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      @include img-wrap(40px);

      img {
        &.blur {
          filter: blur(2px);
        }
      }

      .player-control {
        @include abs-center;
      }

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: var(--font-color-white);
          @include text-ellipsis;
        }
        
        .split {
          font-size: $font-size-xs;
          margin: 0 4px;
        }

        .artists {
          font-size: $font-size-xs;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: $font-size-xs;
        color: var(--font-color-gery);

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;
      
      i {
        color: #fff;
      }
      .icon-play {
        transform: translateX(1px);
      }
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }

    .volume-item {
      margin-left: 22px;
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}

.icon {
  color: var(--font-color);
  cursor: pointer;
}
</style>