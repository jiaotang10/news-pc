import Vue from 'vue'
import { Button, Select, Form, Input, FormItem, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
// 这样用不行
// Vue.use(Message)
// 需要挂载到原型
Vue.prototype.$message = Message
