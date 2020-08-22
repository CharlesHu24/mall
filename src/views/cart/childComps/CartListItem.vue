<template>
  <div id="product-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img" @click="itemClick">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title" @click="itemClick">{{itemInfo.title}}</div>
      <div class="item-desc" @click="itemClick">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{itemInfo.price}}</div>
        <div class="right">
          <button @click="decrement" class="decrement" v-show="itemInfo.count > 1">-</button>
          <span class="item-count">{{itemInfo.count}}</span>
          <button @click="increment" class="increment">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      decrement() {
        return this.itemInfo.count--
      },
      increment() {
        return this.itemInfo.count++
      },
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked;
      },
      itemClick() {
        this.$router.push('/detail/' + this.itemInfo.iid)
      }
    }
  }
</script>

<style scoped>
  #product-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    font-size: 0;
  }

  #product-item a {
    display: flex;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14%;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }


  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .right {
    display: flex;
    /*justify-content: flex-start;*/
  }

  .right button {
    background: none;
    border: none;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .item-count, .decrement, .increment {
    text-align: center;
    width: 24px;
  }

  .decrement, .increment {
    font-weight: 600;
  }
</style>
