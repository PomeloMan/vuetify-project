import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface Response<T> {
  code: string
  message: string
  data: T
}

const instance = axios.create({
  baseURL: 'http://localhost:9000/',
  timeout: 2500, // 现在，在超时前，所有请求都会等待 2.5 秒
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// Alter defaults after instance has been created
instance.defaults.headers.common.Authorization = ''

// 添加请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    config.headers.Authorization = 'Bearer your_access_token'
    return config
  },
  (error: Error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    if (response.status === 200) {
      const r = response.data as Response<any>
      if (r.code === String(200)) {
        return r.data
      }
    }
    return response.data
  },
  (error: Error) => {
    return Promise.reject(error)
  }
)

export default instance
