import { request } from '@/utils'

export const getBanner = () => request.get('/banner?type=0')

export const getPersonalized = params => request.get('/personalized', { params })