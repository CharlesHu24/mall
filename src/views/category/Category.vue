<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="tab-content" ref="scroll" :probe-type="3">
        <div>
          <tab-content-category :subcategories="showSubcategories" @subcategory-load="subcategoryLoad"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import {getCategory, getSubcategory} from "network/category";
  import {debounce} from "../../common/utils";

  export default {
    name: "Category",
    components: {
      TabMenu,
      TabContentCategory,
      NavBar,
      Scroll
    },
    data() {
      return {
        categories: [],
        categoryData: {}, // 选中项里的数据
        currentIndex: -1,
        refresh: null
      }
    },
    created() {
      this._getCategory()
    },
    mounted() {
      this.refresh = debounce(this.$refs.scroll.refresh, 300)
    },
    computed: {
      // 当前类别子数据
      showSubcategories() {
        if (this.currentIndex === -1)
          return {}
        return this.categoryData[this.currentIndex].subcategories
      }
    },
    methods: {
      // 为图片包装一层防抖
      subcategoryLoad() {
        this.refresh()
        // this.$refs.scroll.refresh()
      },
      // 菜单当前位置(下标)
      selectItem(index) {
        this._getSubcategories(index)
      },

      /*
      * 请求数据相关方法
      * */
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {}
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index // 当前下标
        const maitKey = this.categories[index].maitKey  // 根据下标值 找到当前所选中一栏
        getSubcategory(maitKey).then(res => {
          // 保存当前类别子数据
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
        })
      }
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
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #fff;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
