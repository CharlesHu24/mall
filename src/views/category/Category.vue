<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>

      <scroll id="tab-content"></scroll>
    </div>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import {getCategory, getSubcategory} from "network/category";

  export default {
    name: "Category",
    components: {
      TabMenu,
      NavBar,
      Scroll
    },
    data() {
      return {
        categories: [],
        currentIndex: -1
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      // 菜单当前位置(下标)
      selectItem(index) {
        this._getSubcategories(index)
      },

      /*
      * 请求数据相关方法
      * */
      _getCategory() {
        getCategory().then(res => {
          console.log(res);
          this.categories = res.data.category.list
          this._getSubcategories(0)
        })
      }
    },
    _getSubcategories(index) {
      this.currentIndex = index // 当前下标
      const maitKey = this.categories[index].maitKey  // 根据下标值 找到当前所选中一栏
      console.log(maitKey);
      getSubcategory(maitKey).then(res => {
        console.log(res);
      })
    },
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
