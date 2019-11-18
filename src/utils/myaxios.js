import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('heima_39_baseurl', 'http://127.0.0.1:3000')

// 添加拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('heima_39_Authorization')
  // 如果有token，则通过请求头的方式进行传递
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let msg = response.data.message
  if (msg === '用户信息验证失败') {
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
