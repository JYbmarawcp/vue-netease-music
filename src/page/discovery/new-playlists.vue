<template>
  <div class="recommend" v-if="list.length">
    <Title>推荐歌单</Title>
  </div>
</template>

<script>
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
  }
}
</script>

<style>

</style>