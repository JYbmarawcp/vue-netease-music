<template>
  <div class="recommend" v-if="list.length">
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlaylistCard
        :desc="item.copywriter"
        :id="item.id"
        :img="item.picUrl"
        :name="item.name"
        v-for="item in list"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import PlaylistCard from "@/components/playlist-card"
import { getPersonalized } from "@/api"

export default {
  data () {
    return {
      list: []
    }
  },
  async created () {
    const { result } = await getPersonalized({ limit: 10 })
    this.list = result
  },
  components: {
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>