import Vue from 'vue'
import axios from 'axios'

// 将aixos挂在到原型
Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api'
