<template>
  <!-- 使用每一项数据 -->
  <div class="goods" @click="itemClick">
<!--    <img :src="showImg" alt="" @load="imgLoad">  &lt;!&ndash; @load 加载完成后 &ndash;&gt;-->
    <img v-lazy="showImg" alt="" @load="imgLoad">  <!-- @load 加载完成后 -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      // 接收父组件传来的每一项数据
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        // console.log('图片加载完成');
        this.$bus.$emit('itemImgLoad')  // 通过原型发射事件 这就是事件总线
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width: 46.666666%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
