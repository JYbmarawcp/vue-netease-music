<template>
  <div class="mv">
    <div class="mv-content">
      <div class="left">
        <p>MV详情</p>
        <div class="player">

        </div>

        <div class="author-wrap">
          <div class="avatar">
            <img v-lazy="$utils.genImgUrl()" alt="">
          </div>
          <p class="author">{{ }}</p>
        </div>

        <p class="name">{{ }}</p>
        <div class="desc">
          <span class="date">发布：{{}}</span>
          <span class="count">播放： {{ }}次</span>
        </div>

        <div class="comments">
          <!-- <Comments /> -->
        </div>
      </div>

      <div class="right">
        <p class="title">相关推荐</p>
        <div class="simi-mvs">
          <Card
            v-for="simiMv in simiMvs"
            :key="simiMv.id"
            :name="simiMv.name"
            :desc="`by ${simiMv.artistName}`"
            class="simi-mv-card"
          >
            <template #img-wrap>
              <MvCard 
                :duration="simiMv.duration"
                :img="simiMv.cover"
                :playCount="simiMv.playCount"
              />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvDetail, getMvUrl, getSimiMv } from "@/api"
import MvCard from "@/components/mv-card"

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      mvDetail: {},
      mvPlayInfo: "",
      simiMvs: [],

    }
  },
  created () {
    this.init()
  },
  methods: {
    async init() {
      const [
        { data: mvDetail },
        { data: mvPlayInfo },
        { data: simiMvs },
      ] = await Promise.all([
        getMvDetail(this.id),
        getMvUrl(this.id),
        getSimiMv(this.id)
      ])
      this.mvDetail = mvDetail
      this.mvPlayInfo = mvPlayInfo
      this.simiMvs = simiMvs
    }
  },
  components: {
    MvCard
  }
}
</script>

<style>

</style>