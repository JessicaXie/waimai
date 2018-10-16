// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import TopHeader from './components/TopHeader/TopHeader.vue'
import CartControl from './components/CartControl/CartControl'
import Split from './components/Split/Split'
import Start from './components/Start/Start'

import 'swiper/dist/css/swiper.min.css'
import './mock/mockServer'
import './filters/index'
// Vue.config.productionTip = false
// 注册全局组件
Vue.component('TopHeader', TopHeader)
Vue.component(Button.name, Button)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
Vue.component('Start', Start)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
