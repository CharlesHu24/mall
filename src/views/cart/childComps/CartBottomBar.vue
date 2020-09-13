<template>
  <div class="bottom-bar">
    <div class="check">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button"/>
      <span>全选</span>
    </div>
    <div class="total" v-show="isShow">
      <div class="total-price">总计：<span class="number">{{totalPrice}}</span></div>
      <div class="buy" :class="{disabled: checkLength === 0}" @click="checkLength > 0 && buyClick()">
        去结算({{checkLength}}件)
      </div>
    </div>
    <div class="del-product" v-show="!isShow">
      <div class="del-btn" @click="del()">删除</div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters, mapActions} from "vuex"

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    data() {
      return {
        editBtnListeter: null,
        isShow: true
      }
    },
    mounted() {
      // 回调函数
      this.editBtnListeter = (text) => {
        this.switchCpn(text)
      }

      this.$bus.$on('editProduct', this.editBtnListeter)
    },
    deactivated() {
      // this.$bus.$off('editProduct', this.editBtnListeter)
    },
    computed: {
      ...mapGetters(['cartList']),
      checkProduct() {
        return this.cartList.filter(item => item.checked)
      },
      totalPrice() {
        return '￥' + this.checkProduct.reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.checkProduct.reduce((preValue, item) => {
          return preValue + item.count
        }, 0)
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false

        // 当找到!item.checked(没选中的) 返回true  取反为false(就不显示)
        // 当没有找到!item.checked 返回false  取反为true(显示)
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      ...mapActions(['del']),
      checkClick() {
        if (this.isSelectAll) { //全选
          this.cartList.forEach(item => item.checked = false)
        } else {  //全不选 or 某些没选
          this.cartList.forEach(item => item.checked = true)
        }
      },
      buyClick() {
        this.$toast.show('该功能敬请期待^_^')
      },
      switchCpn(text) {
        switch (text) {
          case '编辑商品':
            this.isShow = true
            break
          case '完成':
            this.isShow = false
            break
        }
      }
    }
  }
</script>


<style scoped>
  .bottom-bar {
    position: relative;
    align-items: center;
    height: 50px;
    line-height: 50px;
    padding-left: 63px;
    background-color: #f6f6f6;
  }

  .bottom-bar, .total, .check {
    display: flex;
  }

  .check {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    justify-content: flex-end;
    align-items: center;
    width: 60px;
    height: 100%;
    font-size: .6rem;
    line-height: 50px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin: 4px;
    line-height: 20px;
  }

  .total {
    width: 100%;
  }

  .total-price {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: 50px;
    text-align: right;
    position: relative;
  }

  .number {
    font-weight: 600;
  }

  .buy {
    margin: 6px 12px 0;
    font-weight: 700;
    display: block;
    width: 113px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    background-color: var(--color-tint);
    color: #fff;
    font-size: .7rem;
  }

  .disabled {
    opacity: .3;
  }

  .del-product {
    position: absolute;
    right: 6px;
  }

  .del-product .del-btn {
    float: right;
    box-sizing: border-box;
    border: 1px solid #8c8c8c;
    display: block;
    padding: 0 .9rem;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: .6rem;
    border-radius: 15px;
    margin: 10px 12px 0 0;
  }
</style>
