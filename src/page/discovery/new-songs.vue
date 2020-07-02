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
        <SongCard
          v-for="(item,index) in list"
          :key="item.id"
          :order="getSongOrder(listIndex, index)"
          class="song-card"
          v-bind="nomalizeSong(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getNewSongs } from "@/api"
import SongCard from "@/components/song-card"
import { createSong } from "@/utils"

const songsLimit = 10
export default {
  async created () {
    const { result } = await getNewSongs()
    this.list = result
  },
  data () {
    return {
      chunkLimit: Math.ceil(songsLimit /2 ),
      list: []
    }
  },
  methods: {
    getSongOrder(listIndex, index) {
      return listIndex * this.chunkLimit + index + 1
    },
    nomalizeSong(song) {
      const {
        id,
        name,
        song: {
          mvid,
          artists,
          album: { blurPicUrl },
          duration
        }
      } = song
      return createSong({
        id,
        name,
        mvId: mvid,
        artists,
        img: blurPicUrl,
        duration
      })
    }
  },
  computed: {
    thunkedList() {
      return [
        this.list.slice(0, this.chunkLimit),
        this.list.slice(this.chunkLimit, this.list.length)
      ]
    }
  },
  components: {
    SongCard
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