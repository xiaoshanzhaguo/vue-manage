import Vue from 'vue'
import App from './App.vue'
import { Button, Radio, Header, Main, Aside, Container, Menu, MenuItem, Submenu, MenuItemGroup } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from '../router'

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

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
