<template>
  <div class="tab-content" v-if="subcategories.list">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="" @load="imgLoad">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabContentCategory",
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        // console.log('图片加载完成');
        this.$emit('subcategory-load')
      }
    }
  }
</script>

<style scoped>
  .tab-content {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
  }

  .item {
    width: 33%;
    text-align: center;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 5px;
  }

</style>
