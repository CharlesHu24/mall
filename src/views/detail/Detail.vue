<template>
  <div id="detail" >
    <detail-nav-bar/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo" class="box-two"/>
      <detail-shop-info :shop="shopInfo" class="box-four"/>
      <detail-image-info :detail-info="detailInfo" @detail-img-load="detailImgLoad"/>
      <detail-params-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetailData, getRecommends, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";

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
        recommends: []
      }
    },
    methods: {
      detailImgLoad() {
        this.newRefresh() // 防抖
        // this.$refs.scroll.refresh()
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
        console.log(res);

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
      })

      // 3.请求详情页推荐数据
      getRecommends().then(res => {
        // console.log(res);

        this.recommends = res.data.list
      })
    },
    // 混入
    mixins: [itemListenerMixin],
    mounted() {
    },
    // 这里没有做缓存  所以不能用activated函数，， 使用destroyed函数
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
      console.log('详情页退出了');
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

  .box-two {
    background-color: #fff;
    border-radius: 0 0 10px 10px;
  }

  .box-four {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 12px;
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
