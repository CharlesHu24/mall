<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>  <!-- 当成计算属性使用 -->
      <div slot="right" class="edit" @click="editClick">{{text}}</div>
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
    data() {
      return {
        text: '编辑商品'
      }
    },
    computed: {
      //使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'cartLength'
      ])
    },
    methods: {
      editClick() {
        switch (this.text) {
          case '完成':
            this.text = '编辑商品'
            break
          case '编辑商品':
            this.text = '完成'
            break
        }
        this.$bus.$emit('editProduct', this.text)
      }
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
    font-size: .75rem;
  }
</style>
