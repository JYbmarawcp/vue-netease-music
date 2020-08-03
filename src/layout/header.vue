<template>
  <div class="header">
    <div class="left">
      <div class="buttons">
        <div
          @click="onClickHome"
          class="mac-button red"
        >
          <Icon :size="9" type="home" />
        </div>
        <div
          @click="exitFullscreen"
          class="mac-button yellow"
        >
          <Icon :size="9" type="minus" />
        </div>
        <div
          @click="fullscreen"
          class="mac-button green"
        >
          <Icon :size="9" type="fullscreen" />
        </div>
      </div>
      <!-- 缩起播放器 -->
      <div
        @click="onClickDown"
        class="shrink-player"
        v-show="isPlayerShow"
      >
        <Icon 
          type="down"
          :backdrop="true"
        />
      </div>
      <!-- 路由记录器 -->
      <div
        class="history"
        v-show="!isPlayerShow"
      >
        <RoutesHistory />
      </div>
    </div>
    <div class="right">
      <div class="search-wrap">
        <Search />
      </div>
      <Theme />
    </div>
  </div>
</template>

<script>
import Search from "@/components/search"
import Theme from "@/components/theme"
import RoutesHistory from "@/components/routes-history"
import { mapState, mapMutations } from "@/store/helper/music"
import{ requestFullScreen, exitFullscreen, isFullscreen } from "@/utils"

export default {
  methods: {
    onClickHome() {
      this.$router.push("/discovery")
    },
    onClickDown() {
      this.setPlayerShow(false)
    },
    fullscreen() {
      requestFullScreen(document.documentElement)
    },
    exitFullscreen() {
      if (isFullscreen()) {
        exitFullscreen()
      }
    },
    ...mapMutations(["setPlayerShow"])
  },
  computed: {
    ...mapState(["isPlayerShow"])
  },
  components: {
    Search,
    Theme,
    RoutesHistory
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/element-overwrite.scss";

.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;

  @include el-input-theme(
    var(--header-input-color),
    var(--header-input-bgcolor),
    var(--header-input-placeholder-color)
  );

  /deep/.iconfont {
    color: var(--header-font-color);
  }

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    .font-weight {
      white-space: nowrap;
    }

    .buttons {
      display: flex;

      &:hover {
        .mac-button > i {
          opacity: 1;
        }
      }

      .mac-button {
        @include round(12px);
        @include flex-center;
        margin-right: 8px;
        cursor: pointer;

        &.red {
          background: #ed655a;
        }

        &.green {
          background: #72be47;
        }

        &.yellow {
          background: #e0c04c;
        }

        i {
          opacity: 0;
          transform: opacity 0.3s;
          color: $black;
          font-weight: $font-weight-bold;
          transform-origin: center center;
        }
      }
    }

    .shrink-player {
      position: relative;
      top: -6px;
      margin-left: 16px;
    }

    .history {
      margin-left: 65px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>