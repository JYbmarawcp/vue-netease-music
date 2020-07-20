<template>
  <div class="mini-player">
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
        <div slot="reference" class="play-icon">
          <Icon :size="24" :type="playIcon" />
        </div>
      </el-popover>
      <Icon :size="24" class="icon" type="next" />
    </div>

    <div class="mode">
      <!-- 模式 -->
      <Share :shareUrl="shareUrl" class="mode-item" />
    </div>
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

export default {
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations([
      "setCurrentTime",
      "setPlayingState"
    ]),

  },
  computed: {
    playIcon() {
      return "play"
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
      "playing"
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
}
</style>