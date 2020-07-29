<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    /* 本身的样式 */
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
    background-color: #fff;
    height: 49px;

    /* 定位相关 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 利用flex进行布局 */
    display: flex;
    text-align: center;

  }
</style>
