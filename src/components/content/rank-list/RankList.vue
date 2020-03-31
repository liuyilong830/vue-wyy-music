<template>
  <div class="rank-list" ref="rankList">
    <div class="contain" ref="contain" @touchstart.prevent='touchStart' @touchmove.prevent='touchMove' @touchend.prevent='touchEnd' style="transform:translateX(0px)">
      <rank-list-item v-for="(item,index) in topList" :key="index" :item='item' :index="index" v-on="$listeners"></rank-list-item>
    </div>
  </div>
</template>

<script>
  import RankListItem from './RankListItem'
  export default {
    name: 'RankList',
    components: {
      RankListItem
    },
    props: {
      topList: {
        type: Array,
        default() {
          return []
        }
      },
      touchw: {
        type: Number,
        default: 80
      }
    },
    data() {
      return {
        startX: 0,
        endX: 0,
        currentIndex: 0,
        offsetX: 0,
        touchX: 0,
        width: 0,
        marginBottom: 0,
        maxIndex: 0,
        containWidth: 0,
        rankListWidth: 0
      }
    },
    methods: {
      translateX(offset) {
        this.$refs.contain.style.transform = `translateX(${offset}px)`
      },
      touchStart(event) {
        this.offsetX = 0
        this.endX = 0
        this.startX = event.touches[0].pageX || event.touches[0].clientX
        this.touchX = Number(this.$refs.contain.style.cssText.match(/\d+/g)[0])
        this.$refs.contain.style.transition = '0s'
      },
      touchMove(event) {
        this.endX = event.touches[0].pageX || event.touches[0].clientX
        // offsetX 为正数则是手指往左划，否则手指往右划
        this.offsetX = this.startX - this.endX
        if((this.currentIndex <= 0 && this.offsetX < 0) || (this.currentIndex >= this.maxIndex && this.offsetX > 0)) return
        this.translateX(-(this.touchX + this.offsetX))
      },
      touchEnd() {
        if((this.currentIndex <= 0 && this.offsetX < 0) || (this.currentIndex >= this.maxIndex && this.offsetX > 0)) return
        if(Math.abs(this.offsetX) >= this.touchw) {
          // 往左划动
          if(this.offsetX >= 0) {
            this.touchX = (this.width + this.marginBottom)*(this.currentIndex+1)
            if(this.currentIndex == this.maxIndex - 1) {
              this.touchX -= (this.rankListWidth-this.width)
            }
          // 往右划动
          }else {
            this.touchX = (this.width + this.marginBottom)*(this.currentIndex-1)
          }
          this.translateX(-this.touchX)
          this.offsetX >= 0? this.currentIndex++ : this.currentIndex--
        }else {
          this.translateX(-this.touchX)
        }
        this.$refs.contain.style.transition = '.3s'
      },
    },
    mounted() {
      this.width = this.$refs.contain.children[0].getBoundingClientRect().width
      let w = window.getComputedStyle(this.$refs.contain.children[0]).marginRight
      this.marginBottom = Number(w.substring(0, w.length-2))
      this.maxIndex = this.topList.length-1
      this.containWidth = this.topList.length * (this.width + this.marginBottom) - this.marginBottom
      this.$refs.contain.style.width = this.containWidth + 'px'
      this.rankListWidth = this.$refs.rankList.getBoundingClientRect().width
    }
  }
</script>

<style lang="stylus" scoped>
  .rank-list {
    width 100%
    overflow hidden
  }
  .contain {
    width 0px
    touch-action: none
  }
  .contain .rank-list-item:last-child {
    margin-right 0
  }
</style>