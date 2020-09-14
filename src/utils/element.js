import Vue from 'vue'
import {
  Button,
  Select,
  Form,
  Input,
  FormItem,
  Message,
  Container,
  Main,
  Header,
  Aside,
  MessageBox,
  MenuItem,
  Menu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Upload,
  Dialog,
  RadioGroup,
  Radio
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
// 这样用不行
// Vue.use(Message)
// 需要挂载到原型
Vue.prototype.$message = Message
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
