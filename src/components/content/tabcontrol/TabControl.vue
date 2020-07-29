<template>
  <!-- 只需传入文字组件 -->
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles">
      <span :class="{active: currentIndex === index}" @click="itemClick(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('goodsClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    z-index: 9;
    text-align: center;
    background-color: #fff;
    /*height: 40px;*/
    line-height: 40px;
    font-size: 15px;
  }
  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
    border-bottom: 3px solid;
  }

</style>
