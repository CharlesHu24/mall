<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper class="home-swiper" :banners="banners"></home-swiper>
    <home-recommends-view :recommends="recommends"/>
    <feature/>
    <tab-control class="tab-control" :titles="['热卖', '新款', '精选']"/>
    <goods-list :goods="goods['pop'].list"/>

  </div>
</template>

<script>
  import HomeSwiper from './childCpns/HomeSwiper'
  import HomeRecommendsView from "./childCpns/HomeRecommendsView";
  import Feature from "./childCpns/Feature";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendsView,
      Feature,
      NavBar,
      TabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          // 初始化数据请求
          'pop': {page: 0, list: []}, // 1: 30, 2: 60, 3: 90
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品列表数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(results => {
          // console.log(results);
          this.banners = results.data.banner.list // 获取轮播图数据
          this.recommends = results.data.recommend.list
        })
      },
      getHomeGoods(type) { // 传入类型
        // 动态获取页面
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          let goodsList = res.data.list
          this.goods[type].list.push(...goodsList) // 把请求的数据保存下来
          this.goods[type].page += 1 // 页码+1
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    z-index: 9;
    width: 100%;
  }

  .home-swiper {
    padding-top: 44px;
  }

  .tab-control {
    /*
      sticky属性： 当没有达到这个位置之前position:static,当达到这个值的时候position:fixed
      但是很多浏览器不支持，一般移动端都支持
    */
    position: sticky;
    top: 44px;
  }
</style>
