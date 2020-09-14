import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局css样式文件
import '../styles/basecss.scss'
// 引入element-ui
import './utils/element'
import './utils/request'
import './utils/filter'

// 全局导入quill富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
