<template>
  <div id="detail">
    <detail-nav-bar @item-index-click="indexClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <detail-params-info :param-info="paramInfo" ref="params"/>
      <detail-image-info :detail-info="detailInfo" @detail-img-load="detailImgLoad"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="topClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailImageInfo from "./childComps/DetailImageInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetailData, getRecommends, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    // 混入
    mixins: [itemListenerMixin, backTopMixin],
    methods: {
      detailImgLoad() {
        this.newRefresh() // 防抖
        // this.$refs.scroll.refresh()
        this.getThemeTopY() // 图片加载完 再计算距离
      },
      indexClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y

        // 2.positionY和主题中值进行对比
        let length = this.themeTopYs.length
        for (var i = 0; i < length - 1; i++) {
          // 普通的做法
          // if ((this.currentIndex !== i) && ((i < length && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

          // hack做法
          if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 3.返回顶部
        this.backTopShowListener(position)
      },
      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.lowNowPrice
        product.iid = this.iid
        // product.link= this.goodsInfo.link

        this.$store.dispatch('addCart', product)
      }

    },
    created() {
      // 1.保存url里路径的商品id
      this.iid = this.$route.params.iid

      // 2.根据iid获取详细数据
      getDetailData(this.iid).then(res => {
        // 1.获取顶部的图片轮播图数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // console.log(res);

        // 2.获取商品数据
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo)

        // 3.获取店铺信息
        this.shopInfo = new Shop(data.shopInfo)

        // 4.获取商品详情图片信息
        this.detailInfo = data.detailInfo

        // 5.获取详细参数信息
        this.paramInfo = data.itemParams

        // 6.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 7.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // // 1.第一次获取: 值不对
        // // 值不对的原因:  this.$refs.comment.$el压根没有渲染
        // this.themeTopYs = []
        //
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        // console.log(this.themeTopYs);

        // 当DOM渲染完(不表示图片加载完) 会回调这个函数
        // this.$nextTick(() => {
        //   // 2.第二次获取： 值不对
        //   // 值不对的原因: 图片没有计算在内
        //   // 对应的DOM已经被渲染出来了
        //   // 但是图片依然在加载(目前获取的offsetTop不包含其中的图片)
        //   // offsetTop值不对的时候，都是因为图片的问题
        //   this.themeTopYs = []
        //
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        //   console.log(this.themeTopYs);
        // })

      })

      // 3.请求详情页推荐数据
      getRecommends().then(res => {
        // console.log(res);
        this.recommends = res.data.list //没有iid 无法进行点击
      })

      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)  // 取最大值

        // console.log(this.themeTopYs);
      }, 100)
    },
    mounted() {
    },
    // 这里没有做缓存  所以不能用activated函数，， 使用destroyed函数
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
      // console.log('详情页退出了');
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    background-color: #f2f2f2;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 60px;*/
  /*}*/

  /*.back-top {*/
  /*  position: fixed;*/
  /*  right: 10px;*/
  /*  bottom: 65px;*/
  /*}*/

</style>
