<template>
  <div class="search-mvs">
    <WithPagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :limit="40"
      :total="mvCount"
      :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
      @getDataSuccess="onGetMvs"
    >
      <ul class="list-wrap">
        <li
          v-for="mv in mvs"
          :key="mv.id"
          class="list-item"
        >
          <MvCard
            :id="mv.id"
            :img="mv.cover"
            :name="mv.name"
            :duration="mv.duration"
            :playCount="mv.playCount"
            :author="mv.artistName"
          />
        </li>
      </ul>
    </WithPagination>
  </div>
</template>

<script>
import WithPagination from "@/components/with-pagination"
import MvCard from "@/components/mv-card"
import { getSearch } from "@/api"

const SEARCH_TYPE_MV = 1004
export default {
  inject: ["searchRoot"],
  created () {
    this.getSearch = getSearch
  },
  data () {
    return {
      mvs: [],
      mvCount: 0
    }
  },
  methods: {
    onGetMvs({ result: {mvs, mvCount }}) {
      this.mvs = mvs,
      this.mvCount = mvCount
      this.searchRoot.onUpdateCount(mvCount)
    }
  },
  computed: {
    searchParams() {
      return { keywords: this.searchRoot.keywords, type: SEARCH_TYPE_MV }
    }
  },
  components: {
    WithPagination,
    MvCard
  }
}
</script>

<style lang="scss" scoped>
.search-mvs {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;

  @include list(25%);
}
</style>