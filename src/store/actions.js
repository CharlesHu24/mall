import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";

export default {
  addCart({state, commit}, payload) {
    // 1.payload新添加的商品
    // for循环做法
    // let oldProduct = null;
    // for (let item of state.cartList) { // 循环购物车里的商品
    //   if (item.iid === payload.iid) { // 判断 将要加到购物车商品的iid 跟 购物车已有商品iid对比
    //     // 如果iid相同 则赋值给空对象
    //     oldProduct = item
    //   }
    // }

    // 使用数组方法
    let oldProduct = state.cartList.find( item => item.iid === payload.iid)

    // 2.判断oldProduct是否存在
    if (oldProduct) {
      // 存在 则只需要数量+1
      commit(ADD_COUNTER, oldProduct)
    } else {
      // 不存在 则添加新商品到购物车 并且数量为1
      payload.count = 1
      commit(ADD_TO_CART, payload)
    }
  }
}
