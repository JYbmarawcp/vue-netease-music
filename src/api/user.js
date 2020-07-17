import { request } from "@/utils"

export const getUserDetail = (uid) => request.get("/user/detail", { params: {uid}})

const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => request.get("/user/playlist", {params: {uid, limit: PLAYLIST_LIMIT}})