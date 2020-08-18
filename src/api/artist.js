import { request } from "@/utils"

// 获取歌手单曲
export const getArtists = id => request.get(`/artists?id=${id}`)
