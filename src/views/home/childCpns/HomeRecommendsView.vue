<template>
  <div class="home-recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendsView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .home-recommend {
    display: flex;
    font-size: 12px;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .home-recommend img{
    width: 4rem;
    height: 4rem;
    margin-bottom: 8px;
  }
</style>
