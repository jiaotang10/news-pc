import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
// 将aixos挂在到原型
Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api'

// 请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.data.statusCode === 401 || res.data.message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Message.error('token失效，请重新登录')
    router.push('/login')
  }
  return res
})
