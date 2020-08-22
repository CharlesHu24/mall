<!--封装滚动条-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, // 可以进行事件点击
        probeType: this.probeType, // 动态传入是否监听滚动
        pullUpLoad: this.pullUpLoad // 动态传入是否监听上拉事件
      })

      // 2.监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position) // 将当前滚动位置发送出去
        })
      }

      // 3.加载更多
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('loadMore')
        })
      }

    },
    methods: {
      // 具体方法实现
      // 回到顶部主要方法
      scrollTo(x, y, time = 300) { //时间给个默认值，没有传第三个值的话默认是300
        // 先判断this.scroll有没有值
        this.scroll && this.scroll.scrollTo(x, y, time)  // x轴, y轴
      },
      refresh() {
        // console.log('刷新');
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        setTimeout(() => {
          this.scroll && this.scroll.finishPullUp()
        }, 2000)

      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
