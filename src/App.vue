<template>
  <div id="app">
    <Layout />
    <MiniPlayer />
    <Playlist />
  </div>
</template>

<script>
import Layout from "@/layout"
import MiniPlayer from "@/components/mini-player"
import Playlist from "@/components/playlist"

export default {
  name: 'app',
  components: {
    Layout,
    MiniPlayer,
    Playlist,
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
