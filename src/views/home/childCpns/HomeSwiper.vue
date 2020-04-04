<template>
  <!--使用轮播图插件-->
  <swiper>
    <swiper-item v-for="item in banners"> <!-- 循环轮播图数组 -->
      <a :href="item.link">
        <img :src="item.image" alt="">
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
    props: {
      // 拿到轮播图数据
      banners: {
        type: Array,
        // 数组、对象 默认值是个工厂函数
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
