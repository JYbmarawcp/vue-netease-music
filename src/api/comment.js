import { requestWithoutLoading } from "@/utils"

//

// 歌单评论
export const getPlaylistComment = params => 
  requestWithoutLoading.get('/comment/playlist', { params })

// Mv评论
export const getMvComment = params => 
  requestWithoutLoading.get('/comment/mv', { params })

