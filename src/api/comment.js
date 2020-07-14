import { request } from "@/utils"

//

// 歌单评论
export const getPlaylistComment = params => 
request.get('/comment/playlist', { params })

// Mv评论
export const getMvComment = params => request.get('/comment/mv', { params })

