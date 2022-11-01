import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { type UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

  const errorHandler = (error: AxiosError) => {
    if (error.response && error.response?.status === 401)
      router.push('/login')
    else
      message.error('网络繁忙')
    return Promise.reject(error)
  }

  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers || {}
    config.headers.service = 'pan'
    const { userInfo } = useUserStore()
    config.headers.token = userInfo?.token || ''
    return config
  }, errorHandler)

  axios.interceptors.response.use((response: AxiosResponse) => {
    if (response.status !== 200)
      response.data = { code: -1, msg: '服务器出错' }
    const res = response.data
    if (res && typeof res.code === 'number') {
      if (res.code === 1) {
        return res
      }
      else if (res.code === 0) {
        message.warn(res.msg)
        return res
      }
      else {
        message.error(res.msg)
        return res
      }
    }
    else {
      return response
    }
  }, errorHandler)
}
