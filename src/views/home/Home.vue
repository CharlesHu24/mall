<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['热卖', '新款', '精选']" @goodsClick="goodsClick" ref="tabControl1" :class="{fixed: isTabFixed}"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentClick" :pull-up-load="true"
            @loadMore="loadMore">
      <home-swiper class="home-swiper" :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommends-view :recommends="recommends"/>
      <feature/>
      <!-- 接收tab-control传来的下标值 -->
      <tab-control :titles="['热卖', '新款', '精选']" @goodsClick="goodsClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 通过.native属性给组件加事件 -->
    <back-top @click.native="topClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendsView from "./childComps/HomeRecommendsView";
  import Feature from "./childComps/Feature";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";


  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {backTopMixin, itemListenerMixin} from "common/mixin";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendsView,
      Feature,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
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
        },
        // 初始化列表展示
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,  // 控制 tabControl 吸顶
        saveY: 0,  // 保存当前位置
      }
    },
    computed: {
      showGoods() {
        console.log(this.goods[this.currentType].list);
        return this.goods[this.currentType].list
      }
    },
    activated() {
      // 活跃时 访问离开时的Y值
      this.$refs.scroll.scrollTo(0, this.saveY, 1) // 这里的第三个参数(时间) 不能给0 会出现bug
      this.$refs.scroll.refresh() // 刷新一次
    },
    mixins: [itemListenerMixin, backTopMixin],
    deactivated() {
      // 离开时保存当前位置Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
      // console.log('Home页退出了');
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
      /**
       * 事件监听相关方法
       */
      goodsClick(index) {
        // 根据下标改变数据类型
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 让两个tabControl保持一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentClick(position) {
        this.backTopShowListener(position)

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
      },
      loadMore() {
        // 上拉加载更多
        this.getHomeGoods(this.currentType) // 当前选中的列表

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      },
      swiperImgLoad() {
        // 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el: 用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /**
       * 网络请求相关的方法
       */
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
          this.goods[type].list.push(...res.data.list) // 把请求的数据保存下来
          this.goods[type].page += 1 // 页码+1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    background-color: #fff;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
