<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <NewPlaylists />
    </div>
  </div>
</template>

<script>
import Banner from "./banner"
import NewPlaylists from "./new-playlists"
export default {
  components: {
    Banner, NewPlaylists
  }
}
</script>
<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>