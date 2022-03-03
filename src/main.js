import Vue from 'vue'
import App from './App.vue'
import { Button, Radio, Header, Main, Aside, Container, Menu, MenuItem, Submenu, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'

import router from '../router'
import store from '../store'

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

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
