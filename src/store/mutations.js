import {
  ADD_COUNTER,
  ADD_TO_CART, DEL_PRODUCT
} from './mutations-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations找到呢每个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  // 删除选中的商品，注意这里不能使用数组删除的方法，索引值会出问题
  [DEL_PRODUCT](state) {
    // state.cartList.some((item, index) => {
    //   if (item.checked) {
    //     state.cartList.splice(index, 1)
    //   }
    // })

    let list = []
    state.cartList.forEach((item, index) => {
      if (!item.checked)
        list.push(item)
    })
    return state.cartList = list
  }
}
