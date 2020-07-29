<template>
  <!--使用轮播图插件-->
  <swiper>
    <swiper-item v-for="item in banners"> <!-- 循环轮播图数组 -->
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      // 拿到轮播图数据
      banners: {
        type: Array,
        // 数组、对象 默认值是个工厂函数
        default() {
          return []
        }
      }
    },
    methods: {
      // 监听轮播图加载完成
      imgLoad() {
        if (!this.isLoad) { // false 通行
          this.$emit('swiperImgLoad')
          this.isLoad = true  // 改为 true, 不再放行
        }
      }
    }
  }
</script>

<style scoped>

</style>
