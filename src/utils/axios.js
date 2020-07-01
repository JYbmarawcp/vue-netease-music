import axios from 'axios'


const BASE_URL = 'https://api.mtnhao.com/'
//不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()
//带全局loading的请求实例
//传入函数是因为需要在处理请求结果handleResponse之前处理loading
//所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance()
//通用的axios的实例
function createBaseInstance() {
    const instance = axios.create({
        baseURL: BASE_URL
    })

    instance.interceptors.response.use(handleResponse)
    return instance
}

//返回响应的结果data
function handleResponse(response) {
    return response.data
}