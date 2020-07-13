<template>
  <div class="header">
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(playlist.coverImgUrl, 400)" alt="">
    </div>
    <div class="content">
      <div class="title-wrap">
        <p class="title">{{ playlist.name }}</p>
      </div>

      <div class="creator-wrap">
        <img :src="$utils.genImgUrl(playlist.creator.avatarUrl, 50)" 
          class="avatar" alt="">
        <p class="creator">{{ playlist.creator.nickname }}</p>
        <p>{{ playlist.createTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
      default: () => ({})
    },
  }
}
</script>

<style>

</style>