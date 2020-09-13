import Toast from './Toast'
import Vue from 'vue'

const obj = {}

obj.install = function () {
  // console.log(Vue);

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.new的方式， 根据组件构造器， 创建一个组件
  const toast = new toastConstructor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.将toast.$el(组件元素)添加到body中
  document.body.appendChild(toast.$el)

  // 5.在vue原型上添加$toast  并且将toast对象添加至$toast
  Vue.prototype.$toast = toast
}

export default obj
