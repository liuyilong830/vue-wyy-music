<template>
  <div class="static-swipe" v-if="list.length !== 0">
    <div class="content" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref="content" style="transform:translateX(0px)">
      <static-swipe-item v-for="(item,index) in list" :key="index+item" :item='item' :flag='flag' @click.native="playsong(item)"></static-swipe-item>
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
        contentWidth: 0,
        transX: 0,
        marginBottom: 0,
        currentIndex: 0,
        width: 0,
        maxIndex: 0
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      touchw: {
        type: Number,
        default: 40
      },
      flag: {
        type: Boolean,
        default: true
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
        if((this.currentIndex <= 0 && this.offsetX < 0) || (this.currentIndex >= this.maxIndex && this.offsetX > 0)) return
        this.translateX(-(this.transX + this.offsetX))
      },
      touchEnd(event) {
        if((this.currentIndex <= 0 && this.offsetX < 0) || (this.currentIndex >= this.maxIndex && this.offsetX > 0)) return
        if(Math.abs(this.offsetX) >= this.touchw) {
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
      },
      playsong(item) {
        this.$emit('playsong', item)
      }
    },
    mounted() {
      this.width = this.$refs.content.children[0].getBoundingClientRect().width
      this.marginBottom = Number(window.getComputedStyle(this.$refs.content.children[0]).marginRight.match(/\d+/g))
      this.maxIndex = this.list.length/3 - 1
      this.contentWidth = this.list.length/3 * (this.width + this.marginBottom)
      // this.contentWidth = this.$refs.content.getBoundingClientRect().width
      this.$refs.content.style.width = this.contentWidth + 'px'
    }
  }
</script>

<style scoped>
  .static-swipe {
    overflow: hidden;
  }
  .content {
    width: 0px;
    height: 100%;
  }
</style>