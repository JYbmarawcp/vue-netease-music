import { request } from "@/utils"

export const getSearch = (params) => request.get('/search', { params })

