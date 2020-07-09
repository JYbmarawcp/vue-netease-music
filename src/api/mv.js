import { request } from '@/utils'

export const getMvDetail = id => request.get(`/mv/detail?mvid=${id}`)

export const getAllMvs = (params) => request.get(`mv/all`, {params})