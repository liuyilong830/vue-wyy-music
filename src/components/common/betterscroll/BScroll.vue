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
    name: 'BScroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      probeType: {
        type: Number,
        default: 0
      },
      bounce: {
        type: Boolean,
        default: true
      },
      scrollX: {
        type: Boolean,
        defalut: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper,{
            pullUpLoad: this.pullUpLoad,
            probeType: this.probeType,
            click: true,
            scrollX: this.scrollX,
            bounce: this.bounce // 关闭better-scroll 的弹簧效果
          })
          // 将上拉加载的方法通过 $emit 传到 Hot.vue 组件中
          this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp',this.scroll);
          })
          // 将计算滑动的距离的方法传到 Hot.vue 组件中
          this.scroll.on('scroll',(position) => {
            this.$emit('positionY',position)
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    methods: {
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      scrollTo(x = 0,y = 0,time = 300) {
        this.scroll.scrollTo(x,y,time)
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>