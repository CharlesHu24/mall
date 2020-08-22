<!-- 测试 不可删 -->


<!--<template>-->
<!--  <div class="detail-shop-box">-->
<!--    <div class="shop-info">-->
<!--      <img :src="shop.logo" alt="">-->
<!--      <span class="title">{{shop.name}}</span>-->
<!--    </div>-->
<!--    <div class="info-tab">-->
<!--      <div class="tab-item">-->
<!--        <p class="num">{{shop.sells}}</p>-->
<!--        <p class="desc">总销量</p>-->
<!--      </div>-->
<!--      <div class="tab-item">-->
<!--        <p class="num">{{shop.goodsCount}}</p>-->
<!--        <p class="desc">全部宝贝</p>-->
<!--      </div>-->
<!--      <div class="evaluation">-->
<!--        <div v-for="item in shop.score" class="evaluation-list">-->
<!--          <span class="evaluation-list-head">{{item.name}}</span>-->
<!--          {{item.score}}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="shop-btn">-->
<!--      <button class="btn-item">-->
<!--        <img src="~assets/img/common/collect.svg" alt="">-->
<!--        <span>关注店铺</span>-->
<!--      </button>-->
<!--      <button class="btn-item">-->
<!--        <img src="" alt="">-->
<!--        <span>进入店铺</span>-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    name: "DetailShopInfo",-->
<!--    props: {-->
<!--      shop: {-->
<!--        type: Object,-->
<!--        default() {-->
<!--          return {}-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->

<!--  .detail-shop-box {-->
<!--    padding: 18px;-->
<!--    font-size: 14px;-->
<!--    color: #333;-->
<!--  }-->

<!--  .shop-info {-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--  }-->
<!--  .shop-info img {-->
<!--    width: 40px;-->
<!--    height: 40px;-->
<!--    margin-right: 8px;-->
<!--    border-radius: 50%;-->
<!--  }-->

<!--  .title {-->
<!--    font-size: 13px;-->
<!--  }-->

<!--  .info-tab {-->
<!--    display: flex;-->
<!--    margin: 18px 0;-->
<!--  }-->

<!--  .tab-item {-->
<!--    padding: 2px 0;-->
<!--    flex: 1;-->
<!--    position: relative;-->
<!--    text-align: center;-->
<!--    display: block;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .tab-item:first-child:after {-->
<!--    content: "";-->
<!--    width: 0;-->
<!--    display: block;-->
<!--    border-right: 1px solid #ddd;-->
<!--    position: absolute;-->
<!--    top: 0;-->
<!--    bottom: 0;-->
<!--    right: 0;-->
<!--  }-->

<!--  .num {-->
<!--    margin-bottom: 3px;-->
<!--  }-->

<!--  .desc {-->
<!--    margin-bottom: 3px;-->
<!--    font-size: 12px;-->
<!--    color: #999;-->
<!--  }-->

<!--  .evaluation {-->
<!--    font-size: 10px;-->
<!--  }-->

<!--  .evaluation-list {-->

<!--  }-->

<!--  .evaluation-list-head {-->
<!--    color: #999;-->
<!--  }-->

<!--  .shop-btn {-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--  }-->

<!--  .btn-item:first-child{-->
<!--    margin-right: 20px;-->
<!--  }-->

<!--  .btn-item img{-->
<!--    width: 13px;-->
<!--    height: 13px;-->
<!--  }-->


<!--</style>-->
<!-- -------------------分割线---------------------- -->


<template>
  <div class="shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    //过滤器
    filters: {
      sellCountFilter(value) {
        let result = value;
        if(value > 10000 )
          result = (value /10000).toFixed(1) + '万';
        return result;
      }
    },
  }
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    background-color: #fff;
    margin-bottom: 12px;
    border-radius: 10px;
  }

  .shop-top {
    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }

  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
  }

  .shop-top .title {
    margin-left: 10px;
    vertical-align: center;
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  .sells-count, .goods-count {
    font-size: 18px;
  }

  .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }

  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>



