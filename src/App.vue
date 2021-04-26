<template>
  <div id="app">
    <main-tab-bar/>
    <!--  不让组件被销毁  -->
    <keep-alive exclude="Detail"> <!-- 需要销毁的组件排除在外 -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import './assets/css/base.css';
</style>
