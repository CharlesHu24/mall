<!--回到顶部按钮-->
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top {
    z-index: 10;
    position: absolute;
    right: 8px;
    bottom: 54px;
  }
  .back-top img {
    width: 46px;
    height: 46px;
  }
</style>
