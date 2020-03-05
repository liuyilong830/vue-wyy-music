<template>
  <div class="daily-recommend">
    <nav-bar @confirmBack='confirmBack' class="nav-bar">
      <template v-slot:center>
        <span v-show="titleFlag">每日推荐</span>
      </template>
    </nav-bar>

    <div class="content" @touchstart='touchStart' @touchmove='touchMove' ref="content"></div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DailyRecommend',
    components: {
      NavBar
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    data() {
      return {
        titleFlag: false,
        offsetY: 0,
        startY: 0,
        endY: 0
      }
    },
    computed: {
      getOffsetY() {
        return this.offsetY = this.endY - this.startY
      }
    },
    methods: {
      confirmBack() {
        this.$router.go(-1)
      },
      touchStart(event) {
        // console.log(this.$refs.content.getBoundingClientRect())
        this.startY = event.touches[0].pageY || event.touches[0].clientY
      },
      touchMove(event) {
        this.endY = event.touches[0].pageY || event.touches[0].clientY
        this.getOffsetY
        if(this.offsetY < 0) {
          if(this.$refs.content.getBoundingClientRect().top <= 50) {
            return this.offsetY = -100
          }
          this.$refs.content.style.transform = `translateY(${100-(-this.offsetY)}px)`
        } else {
          if(this.$refs.content.getBoundingClientRect().top >= 150) {
            return this.offsetY = 0
          }
          this.$refs.content.style.transform = `translateY(${this.offsetY}px)`
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .daily-recommend {
    background-color #cccccc
    width 100vw
    height 100vh
    position fixed
    z-index 999
    top 0
    overflow hidden
  }
  .daily-recommend .nav-bar {
    background-color transparentify
  }
  .content {
    border-top-left-radius 25px
    border-top-right-radius 25px
    background-color #fff
    width 100vw
    height: calc(100vh - 49px);
    transform translateY(100px)
  }
</style>