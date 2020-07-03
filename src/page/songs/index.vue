<template>
  <div class="songs">
    <div class="tabs">

    </div>

  </div>
</template>

<script>
import { getTopSongs } from "@/api"
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
      const { data } = await getTopSongs()
    }
  }
}
</script>

<style>

</style>