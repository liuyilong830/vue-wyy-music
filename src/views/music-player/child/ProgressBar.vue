<template>
  <div class="progress-bar">
    <div class="start-time">
      <slot name="startTime">
        <span>00:00</span>
      </slot>
    </div>
    <div class="progress-show">
      <div class="total-length" ref="totalLength" @click="jumpClick">
        <div class="current-length" ref="currentLength">
          <div class="current-dot" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'></div>
        </div>
      </div>
    </div>
    <div class="end-time">
      <slot name="stopTime">
        <span>04:35</span>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    data() {
      return {
        TotalW: 0,
        offsetX: 0,
        touchs: 0,
        touche: 0,
        touchOffsetX: 0
      }
    },
    props: {
      currentLength: {
        type: Number,
        default: 0
      }
    },
    methods: {
      getTotalLength() {
        this.TotalW = this.$refs.totalLength.getBoundingClientRect().width
        this.$emit('getTotalLength',this.TotalW)
      },
      // 当点击进度条的指定位置的时候，将音乐跳转到指定位置开始播放
      jumpClick(event) {
        this.offsetX = event.offsetX
        this.$refs.currentLength.style.width = this.offsetX + 'px'
        this.$emit('changeTime',this.offsetX)
      },
      touchStart(event) {
        this.touchs = this.$refs.totalLength.getBoundingClientRect().x
        console.log(event)
      },
      touchMove(event) {
        this.touche = event.touches[0].pageX || event.touches[0].clientX
        // 如果是向右拖动，则 touchOffsetX 是正数且逐渐增大，否则是负数
        this.touchOffsetX = this.touche - this.touchs
        console.log(event)
        if(this.touchOffsetX >= this.TotalW || this.touchOffsetX <= 0) return
        this.$emit('touchTime',this.touchOffsetX)
      },
      touchEnd() {
        this.$emit('endTime')
      },
    },
    mounted() {
      this.getTotalLength()
    },
    watch: {
      currentLength(val,oldVal) {
        this.$refs.currentLength.style.width = val + 'px'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .progress-bar {
    width 100vw
    height 30px
    box-sizing border-box
    padding 0 15px
    display flex
    align-items center
  }
  .start-time, .end-time {
    flex 10%
    text-align center
  }
  .progress-show {
    flex 80%
  }
  .progress-show .total-length {
    width 90%
    height 2px
    background-color rgba(144,144,144,.7)
    margin 0 auto
  }
  .progress-show .current-length {
    width 0
    height 2px
    background-color #ffffff
    position relative
  }
  .progress-show .current-length .current-dot {
    position absolute
    width 6px
    height 6px
    border-radius 50%
    background-color #fff
    top 50%
    right -1px
    transform translateY(-50%)
  }
  .start-time span, .end-time span {
    color #ffffff
    font-size 12px
  }
</style>