<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>

<!--    <div v-for="item in detailInfo.detailImage">  取出所有图片     -->
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div> <!--  只取出第一组图片 detailInfo.detailImage[0] -->
      <div class="info-list">
        <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
      </div>
<!--    </div>-->


  </div>
</template>

<script>
  export default {
    name: "DetailImageInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        this.$emit('detail-img-load')
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    background-color: #fff;
    margin-bottom: 12px;
    border-radius: 10px;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
