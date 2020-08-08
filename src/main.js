import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

import 'assets/css/base.css'

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require('../src/assets/images/lazy-load.gif'),
  loading: require('../src/assets/images/lazy-load.gif'),
  attempt: 1
})
// 解决移动端300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false
// 创建事件总线
Vue.prototype.$bus = new Vue()

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.log(vm)
