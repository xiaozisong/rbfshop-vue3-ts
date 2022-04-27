import axios from 'axios'

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})

instance.interceptors.request.use(function(config){
  // 在发送请求之前做些什么
  return config
}, function(error){
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
},
function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance