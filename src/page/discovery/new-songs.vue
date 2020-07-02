<template>
  <div
   class="new-songs"
   v-if="list.length"
  >
    <Title>最新音乐</Title>
    <div class="list-wrap">
      <div
        v-for="(list,listIndex) in thunkedList"
        :key="listIndex"
        class="list"
      >
        
      </div>
    </div>
  </div>
</template>

<script>
import { getNewSongs } from "@/api"

export default {
  async created () {
    const { result } = await getNewSongs()
    this.list = result
  },
  data () {
    return {
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
.new-songs {
  margin-bottom: 36px;
  .list-wrap {
    display: flex;

    .list {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>