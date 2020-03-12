<template>
  <div class="static-swipe">
    <div class="content" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref="content" style="transform:translateX(0px)">
      <static-swipe-item v-for="(item,index) in list" :key="index" :item='item'></static-swipe-item>
    </div>
  </div>
</template>

<script>
  import StaticSwipeItem from './StaticSwipeItem'
  export default {
    name: 'StaticSwipe',
    components: {
      StaticSwipeItem
    },
    data() {
      return {
        startX: 0,
        endX: 0,
        offsetX: 0,
        contentX: 0,
        contentWidth: 0,
        transX: 0,
        marginBottom: 0,
        currentIndex: 0,
        width: 0
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      translateX(offset) {
        this.$refs.content.style.transform = `translateX(${offset}px)`
      },
      touchStart(event) {
        this.startX = event.touches[0].pageX || event.touches[0].clientX
        this.transX = Number(this.$refs.content.style.cssText.match(/\d+/g)[0])
        this.$refs.content.style.transition = '0s'
      },
      touchMove(event) {
        this.endX = event.touches[0].pageX || event.touches[0].clientX
        // offsetX 为正数则是手指往左划，否则手指往右划
        this.offsetX = this.startX - this.endX
        if((this.currentIndex <= 0 && this.offsetX < 0) || (this.currentIndex >= 3 && this.offsetX > 0)) return
        this.translateX(-(this.transX + this.offsetX))
      },
      touchEnd(event) {
        if((this.currentIndex <= 0 && this.offsetX < 0) || (this.currentIndex >= 3 && this.offsetX > 0)) return
        if(Math.abs(this.offsetX) >= 40) {
          // 往左划动
          if(this.offsetX >= 0) {
            this.transX = (this.width + this.marginBottom)*(this.currentIndex+1)
          // 往右划动
          }else {
            this.transX = (this.width + this.marginBottom)*(this.currentIndex-1)
          }
          this.translateX(-this.transX)
          this.offsetX >= 0? this.currentIndex++ : this.currentIndex--
        }else {
          this.translateX(0)
        }
        this.$refs.content.style.transition = '.3s'
      }
    },
    mounted() {
      this.contentWidth = this.$refs.content.getBoundingClientRect().width
      this.width = this.$refs.content.children[0].getBoundingClientRect().width
      this.marginBottom = Number(window.getComputedStyle(this.$refs.content.children[0]).marginRight.match(/\d+/g))
    }
  }
</script>

<style scoped>
  .static-swipe {
    overflow: hidden;
  }
  .content {
    width: 1300px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
</style>