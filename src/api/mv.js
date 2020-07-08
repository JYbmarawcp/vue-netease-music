import { request } from '@/utils'

export const getMvDetail = id => request.get(`/mv/detail?mvid=${id}`)