import { request } from "@/utils"



// Mv评论
export const getMvComment = params => request.get('/comment/mv', { params })

