import { request, requestWithoutLoading } from "@/utils"


// 获取音乐详情(支持多个id,用 , 隔开)
export const getSongDetail = ids => request.get(`/song/detail?ids=${ids}`)

// 新歌速递
export const getTopSongs = type => request.get(`/top/song?type=${type}`)

// 歌单详情
export const getListDetail = params => request.get('/playlist/detail', {params})

// 相似音乐
export const getSimiSongs = (id, option) => 
  requestWithoutLoading.get(`/simi/song?id=${id}`, option)