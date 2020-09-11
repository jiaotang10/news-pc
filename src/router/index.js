import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 配置异步组件
const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/index', name: 'index', component: Index }
]
const router = new VueRouter({
  routes
})

export default router
