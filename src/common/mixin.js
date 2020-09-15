import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

// 创建混入对象(公共的)
export const itemListenerMixin = {
  // data也可以混入
  data() {
    return {
      itemImgListener: null,  // 用于商品图片监听
      newRefresh: null
    }
  },
  // 混入生命周期函数
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 300)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('我是混入中的内容');
  }
}

// 回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false  // 控制 返回顶部按钮 显示/隐藏
    }
  },
  methods: {
    topClick() {
      // 面向这个组件中的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0)
    },
    backTopShowListener(position) {
      // 条件满足为true
      // 1.判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1200
    }
  }
}

