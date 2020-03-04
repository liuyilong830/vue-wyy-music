<template>
  <div class="wrapper-top" ref="wrapperTop">
    <div class="wrapper-top-content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'TopScroll',
    data() {
      return {
        scroll: null,
        width: 0,
        currentIndex: 0
      }
    },
    props: {
      bounce: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 0
      }
    },
    methods: {
      
    },
    mounted() {
      this.$refs.content.style.width = this.$refs.content.children[0].clientWidth + 'px'
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapperTop,{
          scrollX: true,  //  允许横向滑动
          click: true,   //  允许发生点击事件
          bounce: this.bounce,
          probeType: this.probeType
        })
      })
    }
  }
</script>

<style scoped>
  .wrapper-top {
    width: 100vw;
    overflow: hidden;
  }
  .wrapper-top-content {
    display: flex;
  }
  .content_item {
    width: 40px;
    padding: 0 5px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .content_item span {
    padding-bottom: 2px;
  }
  .active {
    color: #ff6c25;
  }
  .active span {
    border-bottom: 2px solid #ff6c25;
  }
</style>