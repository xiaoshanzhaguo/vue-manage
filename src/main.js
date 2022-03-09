import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Radio,
  Header,
  Main,
  Aside,
  Container,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Pagination,
  Message,
  MessageBox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'

import router from '../router'
import store from '../store'
import http from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)

// axios不是插件，它想在全局中使用，只能将它绑定在vue的prototype上，那么我们就可以在页面上写请求。
Vue.prototype.$http = http

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 下面这个方法就可以实现路由的监听，它接收一个函数(有三个参数,to, from, next)
router.beforeEach((to, from, next) => {
  // 下面写导航守卫相关的逻辑
  // 首先获取token信息，这里调用state的getToken目的是为了防止页面刷新后vuex丢失我们的token信息
  store.commit('getToken')
  // 拿到store中的token
  const token = store.state.user.token
  // 拿到token后进行判断。如果token不存在并且它不是登录页，就不能让它登录系统
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' }) // 重定向到首页
  } else {
    // 登录成功的情况，就让它继续往下走
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    // 通过store调用addMenu这个mutation，然后将router实例传进去
    store.commit('addMenu', router)
  }
}).$mount('#app')