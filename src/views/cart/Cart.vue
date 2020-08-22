<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>  <!-- 当成计算属性使用 -->
      <div slot="right" class="edit">编辑</div>
    </nav-bar>

    <!--  商品列表  -->
    <cart-list/>

    <!--  商品汇总  -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex' //调用vuex 的 mapGetters 辅助函数

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 400;
  }

  .cart {
    height: 100vh;
  }

  .edit {
    font-size: 14px;
  }
</style>
