import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui
import './utils/element'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
