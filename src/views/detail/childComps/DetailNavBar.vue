<template>
  <nav-bar>
    <div class="back" slot="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <nav class="title" slot="center">
      <div class="title-item" v-for="(item, index) in titles" @click="itemClick(index)">
        <span class="title-text" :class="{active: currentIndex === index}">{{item}}</span>
      </div>
    </nav>
    <div class="more" slot="right">
      <img src="~assets/img/common/more.svg" alt="">
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '评价', '详情', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('item-index-click', index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .back, .more {
    display: inline-flex;
    margin: 6px 14px;
  }

  .back img, .more img {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
    border-bottom: 2px solid;

  }

  .title-text {
    padding: 5px;
  }
</style>
