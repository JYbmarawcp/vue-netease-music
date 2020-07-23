import { isDef } from "@/utils"

// export const currentIndex = (state) => {
//   const { currentSong, play}
// }


// 当前是否有歌曲在播放
export const hasCurrentSong = (state) => {
  return isDef(state.currentSong.id)
}