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

// 配置全局的导航守卫
router.beforeEach((to, from, next) => {
  // 判断 to去哪儿
  // 如果是去登录页，直接放行
  // 如果不是，判断是否有token，有token放行，没有，去登录
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
