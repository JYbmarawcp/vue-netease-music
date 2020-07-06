<template>
  <div class="songs">
    <div class="tabs">
      
    </div>
    <SongTable 
      :songs="songs"
      header-row-class-name="header-row"
    />
  </div>
</template>

<script>
import { getTopSongs } from "@/api"
import { createSong } from "@/utils"
import SongTable from '@/components/song-table'

export default {
  async created () {
    this.tabs = [
      { title: "全部", type: 0 },
      { title: "华语", type: 7 },
      { title: "欧美", type: 96 },
      { title: "日本", type: 8 },
      { title: "韩国", type: 16 },
    ]
    this.getsongs()
  },
  data () {
    return {
      
    }
  },
  methods: {
    async getsongs() {
      const { data } = await getTopSongs(this.tabs[this.activeTabIndex].type)
      this.songs = data.map(song => {
        const {
          id,
          name,
          artists,
          duration,
          mvid,
          album: { picUrl, name: albumName }
        } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          albumName,
          img: picUrl,
          mvId: mvid
        })
      })
    }
  },
  components: {
    SongTable
  }
}
</script>

<style lang="scss">
.songs {
  padding: 12px;

  .header-row {
    display: none;
  }
}
</style>