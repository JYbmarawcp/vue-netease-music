import { request } from "@/utils"

// 新歌速递
export const getTopSongs = type => request.get(`/top/song?type=${type}`)

// 歌单详情
export const getListDetail = params => request.get('/playlist/detail', {params})
