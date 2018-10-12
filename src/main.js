// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import TopHeader from './components/TopHeader/TopHeader.vue'

import 'swiper/dist/css/swiper.min.css'

// Vue.config.productionTip = false
// 注册全局组件
Vue.component('TopHeader', TopHeader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
