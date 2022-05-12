import Message from '@/components/message/index'
import axios, { AxiosError } from 'axios'
import { getProfile } from './storage'
// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
// export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(function(config){
  const { token } = getProfile()
  console.log(token)
  
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  // 在发送请求之前做些什么
  return config
}, function(error){
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error: AxiosError<{code: string, message: string}>) {
  if(error.response){
    const { code, message } = error.response.data
    if (code === '501' && message === '三方登录失败') {
      Message({type: 'warning', text: '未于平台绑定第三方认证'})
    }else{
      Message({type: 'warning', text: message})
    }
  }else{
    Message({type: 'error', text: '服务器异常，请重试'})
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance