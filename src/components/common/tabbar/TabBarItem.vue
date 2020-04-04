<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data() {
      return {
        // isShow: true
      }
    },
    // 接收父组件传过来的path
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#e89abe'
      }
    },
    methods: {
      // 替换路由地址
      itemClick() {
        this.$router.replace(this.path).catch(() => {})
      }
    },
    computed: {
      isActive() {
        // /home -> (/home) == true
        // /home -> (/category) == false
        // /home -> (/cart) == false
        // /home -> (/profile) == false
        // 上面意思解释：当前处于活跃的路径 找到 当前路径就返回true
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle() {
        // 如果当前路由处于活跃状态，就改变它的颜色
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tabbar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }

  .tabbar-item img{
    width: 20px;
    height: 20px;
    padding-top: 5px;
    padding-bottom: 2px;
    vertical-align: middle;
  }
</style>
