<template>
  <div class="search">
    <el-input
      @click.native="onClickInput"
      @input="onInput"
      @keypress.native.enter="onEnterPress"
      placeholder="搜索"
      prefix-icon="el-icon-search"
      ref="input"
      v-model.trim="searchKeyword"
    >
    </el-input>
    <Toggle
      :reserveDoms="[$refs.input && $refs.input.$el]"
      :show.sync="searchPanelShow"
    >
      <div 
        class="search-panel"
        v-show="searchPanelShow"
      >
        <div 
          class="search-suggest" 
          v-if="suggestShow"
        >
          <div
            v-for="(normalizedSuggest, index) in normalizedSuggests"
            :key="index"
            class="suggest-item"
          >
            <div class="title">
              <Icon
                :size="12"
                :type="normalizedSuggest.icon"
              />
              {{normalizedSuggest.title}}
            </div>
            <ul class="list">
              <li
                v-for="item in normalizedSuggest.data"
                :key="item.id"
                class="item"

              >
                <HighlightText
                  :highlightText="searchKeyword"
                  :text="normalizedSuggest.renderName ? normalizedSuggest.renderName(item) : item.name"
                />
              </li>
            </ul>
          </div>
        </div>
        <div 
          class="search-hots" v-else
        >
          <div class="block">
            <p class="title">热门搜索</p>
            <div class="tags">
              <NButton
                v-for="(hot, index) in searchHot"
                :key="index"
                class="button"
                @click="onClickHot(hot)"
              >
                {{hot.first}}
              </NButton>
            </div>
          </div>

          <div class="block">
            <p class="title">搜索历史</p>
            <div
              class="tags" 
              v-if="searchHistorys.length"
            >
              <NButton
                v-for="(history, index) in searchHistorys"
                :key="index"
                class="button"
                @click="oonClickHot(hot)"
              >
                {{history.first}}
              </NButton>
            </div>
            <Empty class="empty" v-else>暂无搜索历史</Empty>
          </div>
        </div>
      </div>
    </Toggle>
  </div>
</template>

<script>
import storage from 'good-storage'
import { getSearchHot, getSearchSuggest } from "@/api"
import { getArtistsText, debounce } from "@/utils"

const SEARCH_HISTORY_KEY = "__search_history__"
export default {
  async created () {
    const { result: { hots } } = await getSearchHot()
    this.searchHot = hots
  },
  data () {
    return {
      searchPanelShow: false,
      searchKeyword: "",
      searchHot: [],
      searchHistorys: storage.get(SEARCH_HISTORY_KEY, []),
      suggest: {},
    }
  },
  methods: {
    onClickInput() {
      this.searchPanelShow = true
    },
    onInput: debounce(function(value) {
      if (!value.trim()) return
      getSearchSuggest(value).then(({result}) => {
        this.suggest = result
      })
    }, 500),
    onClickHot(hot) {
      const { first } = hot
      this.goSearch(first)
    },
    onEnterPress() {
      if (this.searchKeyword) {
        this.goSearch(this.searchKeyword)
      }
    },
    goSearch(keywords) {
      this.searchHistorys.unshift({ first: keywords })
      storage.set(SEARCH_HISTORY_KEY, this.searchHistorys)
      this.$router.push(`/search/${keywords}`)
      this.searchPanelShow = false
    },
    
  },
  computed: {
    suggestShow() {
      return this.searchKeyword.length &&
        ["songs", "artists", "albums", "playlists"].find(key => {
          return this.suggest[key] && this.suggest[key].length
        })
    },
    normalizedSuggests() {
      return [
        {
          title: "单曲",
          icon: "music",
          data: this.suggest.songs,
          renderName(song) {
            return `${song.name} - ${getArtistsText(song.artists)}`
          },
        },
        {
          title: "歌手",
          icon: "yonghu",
          data: this.suggest.artists,
        },
        {
          title: "专辑",
          icon: "mv",
          data: this.suggest.albums,
          renderName(album) {
            return `${album.name} - ${album.artist.name}`
          },
        },
        {
          title: "歌单",
          icon: "playlist",
          data: this.suggest.playlists,
          
        }
      ].filter(item => item.data && item.data.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 150px;

  .search-panel {
    position: fixed;
    top: $header-height;
    bottom: $mini-player-height;
    right: 0;
    width: 350px;
    background: var(--search-bgcolor);
    z-index: $search-panel-z-index;
    font-size: $font-size-sm;
    overflow-y: auto;

    .block {
      padding: 16px 24px;

      .title {
        color: var(--font-color-gery);
        margin-bottom: 16px;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;

        .button {
          margin-bottom: 12px;
          margin-right: 6px;
          font-size: $font-size-sm;
        }
      }

      .empty {
        @include flex-center();
        color: var(--font-color-gery);
        font-size: $font-size;
        height: 100px;
      }
    }

    .suggest-item {
      margin-bottom: 16px;

      .title {
        margin: 16px 8px 8px;
        color: var(--font-color-gery-shallow);
      }

      .list {
        .item {
          padding: 12px 24px;
          cursor: pointer;
          @include text-ellipsis();

          &:hover {
            background: var(--light-bgcolor);
          }
        }
      }
    }
  }
}
</style>