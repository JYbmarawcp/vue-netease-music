// import storage from 'good-storage'
import { getSongImg } from "@/utils"

export default {
  // 整合歌曲信息 并且开始播放
  async startSong({ commit }, rawSong) {
    // 浅拷贝一份 改变引用
    // 1.不污染元数据
    // 2.单曲循环为了触发watch
    const song = Object.assign({}, rawSong)
    if (!song.img) {
      if (song.albumId) {
        song.img = await getSongImg(song.id, song.albumId)
      }
    }
    commit('setCurrentSong', song)
    commit('setPlayingState', true)
    // 历史记录
    
  }
}