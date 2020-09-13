import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store";
// 1.调用toast  当成插件使用
import toast from "components/common/toast"

import FastClick from  'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 减少移动端点击产生的300ms延迟
FastClick.attach(document.body)

// 2.安装自定义的toast插件 执行toast里的install方法
Vue.use(toast)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
