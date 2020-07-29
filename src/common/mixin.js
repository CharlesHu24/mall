import {debounce} from "./utils";

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
