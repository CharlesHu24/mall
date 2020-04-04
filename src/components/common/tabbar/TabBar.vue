<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tabbar {
    display: flex;
    background-color: #afffd7;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>