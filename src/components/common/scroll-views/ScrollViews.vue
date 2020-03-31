<template>
  <div class="scroll-views">
    <div class="contain" ref="contain" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend">
      <div class="view" v-for="(item,index) in list" :key="index">
        <all-search-result :index="index" v-bind="$attrs"></all-search-result>
      </div>
    </div>
  </div>
</template>

<script>
  import AllSearchResult from 'views/search/AllSearchResult'
  export default {
    name: 'ScrollViews',
    components: {
      AllSearchResult
    },
    data() {
      return {
        viewWidth: 0,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        endX: 0,
        endY: 0,
        transX: 0,
        currentIndex: 0,
        swipeY: 0,
        swipeX: 0
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      index: {
        type: Number,
        default: 0
      }
    },
    methods: {
      ontouchstart(event) {
        this.startX = event.touches[0].pageX || event.touches[0].clientX
        this.startY =event.touches[0].pageY || event.touches[0].clientY
        this.$refs.contain.style.transition = '0s'
        this.offsetY = this.offsetX = 0
        this.swipeY = this.swipeX = true
      },
      ontouchmove(event) {
        this.endX = event.touches[0].pageX || event.touches[0].clientX
        this.endY = event.touches[0].pageY || event.touches[0].clientY
        if(this.swipeX && Math.abs(this.offsetX) - Math.abs(this.offsetY) > 10) {
          this.swipeY = false
          this.offsetY = 10000
        } else if(this.swipeY && Math.abs(this.offsetY) - Math.abs(this.offsetX) > 10) {
          this.swipeX = false
          this.offsetY = 10000
          return
        }
        // 如果是向左滑动，则 offsetX 值为正，反之则为负
        this.offsetX = this.startX - this.endX
        this.offsetY = this.startY - this.endY
        if(Math.abs(this.offsetX) < 10) return
        if((this.currentIndex <= 0 && this.offsetX <= 0) || (this.currentIndex >= this.list.length-1 && this.offsetX > 0)) return
        if(this.offsetX > 0) {
          this.translateX(this.transX - this.offsetX + 10)
        } else {
          this.translateX(this.transX - this.offsetX - 10)
        }
      },
      ontouchend() {
        if((this.currentIndex <= 0 && this.offsetX <= 0) || (this.currentIndex >= this.list.length-1 && this.offsetX > 0)) return
        if(Math.abs(this.offsetX) >= 80) {
          // 往左划动
          if(this.offsetX >= 0) {
            this.transX = -this.viewWidth*(this.currentIndex+1)
            // 往右划动
          }else {
            this.transX = -this.viewWidth*(this.currentIndex-1)
          }
          this.offsetX >= 0? this.currentIndex++ : this.currentIndex--
        }
        this.translateX(this.transX)
        this.$refs.contain.style.transition = '.3s'
      },
      translateX(offset) {
        this.$refs.contain.style.transform = `translateX(${offset}px)`
      },
    },
    mounted() {
      this.viewWidth =  window.innerWidth
      this.$refs.contain.style.width = this.viewWidth * this.list.length + 'px'
    },
    watch: {
      currentIndex(val,oldVal) {
        this.$emit('changeIndex', val)
      },
      index(val) {
        this.currentIndex = val
        this.transX = -this.viewWidth*val
        this.translateX(this.transX)
        this.$refs.contain.style.transition = '.3s'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .scroll-views {
    width: 100%;
    height: 100%;
    overflow hidden
    .contain {
      width: 900vw;
      height: 100%;
      overflow hidden
      .view {
        width: 100vw;
        height: 100%;
        float left
        box-sizing border-box
        padding 0 15px
      }
    }
  }
</style>