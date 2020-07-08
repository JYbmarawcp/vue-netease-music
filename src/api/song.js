import { request } from "@/utils"

// 新歌速递
export const getTopSongs = type => request.get(`/top/song?type=${type}`)